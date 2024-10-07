import os
from pathlib import Path

import torch
from PIL import Image
from torchvision.transforms.functional import to_pil_image, pil_to_tensor
from tqdm import tqdm

from models.stylegan2_generator import StyleGAN2Generator

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

DATA_DIR = Path('../.data/synthetic')
HAMMER_WORK_DIRS = Path('../work_dirs/')

PATHS = {
    'c_stylegan2_imagenome256_atelectasis_pa_resized': HAMMER_WORK_DIRS / 'c_stylegan2_imagenome256_atelectasis_pa_resized/checkpoints/best-fid50k_full-checkpoint-070400.pth',
    'c_stylegan2_imagenome256_enlarged_cardiac_pa_resized': HAMMER_WORK_DIRS / 'c_stylegan2_imagenome256_enlarged_cardiac_pa_resized/checkpoints/best-fid50k_full-checkpoint-070400.pth',
    'c_stylegan2_imagenome256_lung_opacity_pa_resized': HAMMER_WORK_DIRS / 'c_stylegan2_imagenome256_lung_opacity_pa_resized/checkpoints/best-fid50k_full-checkpoint-075000.pth',
    'c_stylegan2_imagenome256_pleural_effusion_pa_resized': HAMMER_WORK_DIRS / 'c_stylegan2_imagenome256_pleural_effusion_pa_resized/checkpoints/best-fid50k_full-checkpoint-075000.pth',
}


def load_generator(path):
    checkpoint = torch.load(path, map_location='cpu')
    init_kwargs = checkpoint['model_kwargs_init']['generator_smooth']
    del init_kwargs['model_type']
    model_kwargs_val = checkpoint['model_kwargs_val']['generator_smooth']
    generator = StyleGAN2Generator(**init_kwargs)
    generator.load_state_dict(checkpoint['models']['generator_smooth'])
    generator.eval()
    return generator, model_kwargs_val


def generate_images(generator, label, batch_size, model_kwargs, device='cpu'):
    """Uses the generator to generate a batch of images.

    Args:
        generator (StyleGAN2Generator): The generator to use.
        label (List[int]): The label to use in one-hot encoding. This list will be 
            repeated to match the batch size.
        batch_size (int): The number of images to generate.
        model_kwargs (dict): The model kwargs to be passed to the model on inference.

    """
    codes = torch.randn((batch_size, 512)).to(device)
    labels = torch.tensor([label] * batch_size).to(device)
    with torch.no_grad():
        out = generator(codes, label=labels, **model_kwargs)
    return out['image'], out['z'], out['w'], out['wp']


def process_generated_tensor(img_tensor: torch.Tensor) -> Image:
    """Converts a generated image tensor to a PIL image.

    The image tensor is expected to be approx. in the range [-1, 1], as is the case
    with the StyleGAN2Generator output.

    Args:
        img_tensor (torch.Tensor): The image tensor to convert.

    Returns:
        PIL.Image: The converted image.

    """
    _min, _max = -1, 1
    img_tensor = torch.clamp(img_tensor, _min, _max)
    img_tensor = (img_tensor - _min) / (_max - _min)
    pil_image = to_pil_image(img_tensor)
    return pil_image


def get_last_id(dir):
    ids = [int(file_name.split('.')[0]) for file_name in os.listdir(dir)]
    return max(ids) if ids else 0


def save_batch(batch_images, dir, last_id: int = -1):
    for i, img in enumerate(batch_images):
        img = process_generated_tensor(img)
        id = last_id + i + 1
        id_str = str(id).zfill(6)
        img.save(os.path.join(dir, f'{id_str}.png'))


def create_destination_dir(destination_dir: str):
    if os.path.exists(destination_dir):
        raise ValueError(f'Folder {destination_dir} already exists')
    else:
        os.makedirs(destination_dir, exist_ok=True)


def finding_name_to_snake_case(finding_name: str):
    """Take the first two words and then join them with an underscore

    Also, make it lowercase.

    For example:

    >>> finding_name_to_snake_case('Enlarged Cardiac Silhouette')
    'enlarged_cardiac'

    """
    return '_'.join(finding_name.split(' ')[:2]).lower()


def generate_conditioned(
    model_name: str,
    finding_name: str,
    batch_size: int,
    total_imgs: int,
    device: str = 'cpu',
    experiment_prefix: str = 'c_stylegan2_imagenome_',
    experiment_suffix: str = '',
) -> None:
    """
    Folder structure:

    data_dir
    ├── experiment_dir
    │   ├── imgs
    │   │   ├── 0
    │   │   │   ├── 000001.png
    │   │   │   ├── 000002.png
    │   │   │   ├── ...
    │   │   ├── 1
    │   │   │   ├── 000001.png
    │   │   │   ├── 000002.png
    │   │   │   ├── ...
    """
    # Create destination folder
    finding_as_snake = finding_name_to_snake_case(finding_name)
    experiment_dir = DATA_DIR / f'{experiment_prefix}{finding_as_snake}{experiment_suffix}'
    create_destination_dir(experiment_dir)

    # Create image subfolders
    img_dir = experiment_dir / 'imgs'
    img_negative_dir = img_dir / '0'
    img_positive_dir = img_dir / '1'
    create_destination_dir(img_negative_dir)
    create_destination_dir(img_positive_dir)

    # Generate images
    generator, model_kwargs = load_generator(PATHS[model_name])
    generator = generator.to(device)

    for i in tqdm(range(0, total_imgs, batch_size)):
        # negative generation (absence of finding)
        label_vector = [1, 0]
        batch_images, batch_z, batch_w, batch_wp = generate_images(
            generator, label_vector, batch_size, model_kwargs, device
        )
        save_batch(batch_images, img_negative_dir, last_id=i - 1)

        # positive generation (presence of finding)
        label_vector = [0, 1]
        batch_images, batch_z, batch_w, batch_wp = generate_images(
            generator, label_vector, batch_size, model_kwargs, device
        )
        save_batch(batch_images, img_positive_dir, last_id=i - 1)

    print(f'Generated and saved {total_imgs} negative images in {img_negative_dir}')
    print(f'Generated and saved {total_imgs} positive images in {img_positive_dir}')


if __name__ == '__main__':

    # This is an example of how to call the function to generate images.
    generate_conditioned(
        model_name='c_stylegan2_imagenome256_enlarged_cardiac_pa_resized',
        finding_name='Enlarged Cardiac Silhouette',
        batch_size=40,
        total_imgs=30_000,
        device=device,
        experiment_prefix='c_stylegan2_imagenome_2_',
    )
