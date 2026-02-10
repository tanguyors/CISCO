#!/bin/bash
# Script pour récupérer les fichiers Git LFS avant le build

if command -v git-lfs &> /dev/null; then
    echo "Git LFS détecté, récupération des fichiers..."
    git lfs install
    git lfs pull
    echo "Fichiers LFS récupérés avec succès"
else
    echo "Git LFS n'est pas installé. Les fichiers vidéo ne seront pas disponibles."
    echo "Pour installer Git LFS: https://git-lfs.github.com/"
fi
