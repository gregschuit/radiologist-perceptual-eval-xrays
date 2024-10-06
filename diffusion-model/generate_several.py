
import os

import torch
from diffusers import StableDiffusionPipeline


def generate(seed=None, prompts: List[str]):

    generator = torch.Generator("cuda").manual_seed(1024) if seed else None

    model_path = "./roentgen"
    device='cuda'  # or mps, cpu...
    pipe = StableDiffusionPipeline.from_pretrained(model_path).to(torch.float32).to(device)

    output = pipe(
        [prompt],
        num_inference_steps=75,
        height=256,
        width=256,
        guidance_scale=4,
        generator=generator,
    )
    image = output.images[0]

    # Save image
    image.save(f"/home/gkschuit/magister-projects/{prompt}.png")

    print('Done.')
