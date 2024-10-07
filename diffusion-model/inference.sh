#!/bin/bash
#SBATCH --job-name roentgen-inference           # Custom name
#SBATCH -t 0-12:00                              # Max runtime of 30 minutes
#SBATCH -p batch                                # Choose partition (interactive or batch)
#SBATCH -q batch                                # Choose QoS, must be same as partition
#SBATCH --cpus-per-task 1                       # Request 2 cores
#SBATCH --mem=10G                               # Indicate required memory
#SBATCH --gpus=1                                # Ask for 1 GPU
#SBATCH -o /mnt/workspace/gkschuit/out_%j.txt   # Write stdout to this file
#SBATCH -e /mnt/workspace/gkschuit/err_%j.txt   # Write stderr to this file
#SBATCH --mail-type=END                         # Notify when it ends
#SBATCH --mail-user=mailto:gkschuit@uc.cl       # Notify via email

python inference.py \
    --prompt "pleural effusion" \
    --roentgen_destination_images_dir "~/data/synthetic/roentgen/" \
    --model_path "./roentgen" \
    --device "cuda" \
    --total_images 20 \
    --batch_size 5 \
    --num_inference_steps 75
