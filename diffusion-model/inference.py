"""
This script generates images from a diffusion model.

In particular, it is meant to generate images using Roentgen weights.

Usage:
    python inference.py <prompt>

"""

import argparse
import os
import sys
from pathlib import Path

import torch
from torchvision.transforms import Resize
from diffusers import StableDiffusionPipeline


def parse_args():
    """Parse command-line arguments."""
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--prompt', type=str, required=True)
    parser.add_argument('--roentgen_destination_images_dir', type=str, required=True)
    parser.add_argument('--model_path', type=str, required=True)
    parser.add_argument('--device', type=str, required=False, default='cuda')
    parser.add_argument('--generator_seed', type=int, required=False, default=None)
    parser.add_argument('--total_images', type=int, required=False, default=20)
    parser.add_argument('--batch_size', type=int, required=False, default=5)
    parser.add_argument('--num_inference_steps', type=int, required=False, default=75)
    return parser.parse_args()


def create_destination_dir(destination_dir: str, raise_if_exists: bool = True):
    """Create a directory if it does not exist.

    If the directory exists and raise_if_exists is True, raise an error.

    """
    if os.path.exists(destination_dir):
        if raise_if_exists:
            raise ValueError(f'Folder {destination_dir} already exists')
    else:
        os.mkdir(destination_dir)


def get_last_id(dir: Path):
    """Assuming the files are named with a number, return the highest number.

    If there are no files, return -1.

    """
    names = (file.stem for file in dir.iterdir()) 
    ids = (int(name) for name in names if name.isdigit())
    return max(ids, default=-1)


if __name__ == '__main__':
    args = parse_args()

    PROMPT = args.prompt
    ROENTGEN_DESTINATION_IMAGES_DIR = Path(args.roentgen_destination_images_dir)
    MODEL_PATH = args.model_path
    DEVICE = args.device
    GENERATOR_SEED = args.generator_seed
    TOTAL_IMAGES = args.total_images
    BATCH_SIZE = args.batch_size
    NUM_INFERENCE_STEPS = args.num_inference_steps

    if args.generator_seed is not None:
        generator = torch.Generator("cuda").manual_seed(args.generator_seed)
    else:
        generator = None

    pipe = StableDiffusionPipeline.from_pretrained(MODEL_PATH).to(torch.float32).to(DEVICE)

    create_destination_dir(
        ROENTGEN_DESTINATION_IMAGES_DIR / PROMPT,
        raise_if_exists=False,
    )

    resize_fn = Resize((256, 256))
    count = get_last_id(ROENTGEN_DESTINATION_IMAGES_DIR / PROMPT) + 1

    while count < TOTAL_IMAGES:
        output = pipe(
            [PROMPT],
            num_images_per_prompt=BATCH_SIZE,
            num_inference_steps=NUM_INFERENCE_STEPS,
            height=512,
            width=512,
            guidance_scale=4,
            generator=generator,
        )
        for image in output.images:
            image = resize_fn(image)
            image.save(ROENTGEN_DESTINATION_IMAGES_DIR / PROMPT / f"{str(count).zfill(5)}.png")
            count += 1

    print('Done.')
