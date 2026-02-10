# Script PowerShell pour récupérer les fichiers Git LFS avant le build

if (Get-Command git-lfs -ErrorAction SilentlyContinue) {
    Write-Host "Git LFS détecté, récupération des fichiers..."
    git lfs install
    git lfs pull
    Write-Host "Fichiers LFS récupérés avec succès"
} else {
    Write-Host "Git LFS n'est pas installé. Les fichiers vidéo ne seront pas disponibles."
    Write-Host "Pour installer Git LFS: https://git-lfs.github.com/"
}
