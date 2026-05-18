# ElectroWat DB - one-click git push
# Usage: .\push-site.ps1
#        .\push-site.ps1 "your commit message"
# Or double-click push-site.bat

param(
    [Parameter(Position = 0)]
    [string]$Message = ""
)

$ErrorActionPreference = "Stop"
$ProjectRoot = $PSScriptRoot
Set-Location $ProjectRoot

function Write-Step([string]$text) {
    Write-Host ""
    Write-Host ">> $text" -ForegroundColor Cyan
}

function Fail([string]$text) {
    Write-Host ""
    Write-Host "[FAIL] $text" -ForegroundColor Red
    exit 1
}

Write-Host "ElectroWat DB - Git upload" -ForegroundColor Green
Write-Host "Folder: $ProjectRoot"

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Fail "Git not found. Install from https://git-scm.com/download/win"
}

if (-not (Test-Path (Join-Path $ProjectRoot ".git"))) {
    Fail "Not a git repo. Run git init and git remote add origin <url> first."
}

Write-Step "Check changes"
$status = git status --porcelain
if (-not $status) {
    Write-Host ""
    Write-Host "No local changes to commit." -ForegroundColor Yellow
    Write-Step "git push (if commits pending)"
    git push 2>&1 | Out-Host
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "[OK] Already in sync with remote." -ForegroundColor Green
    }
    exit 0
}

if (-not $Message.Trim()) {
    $default = "Update site " + (Get-Date -Format "yyyy-MM-dd HH:mm")
    $input = Read-Host "Commit message (Enter for default)"
    if ($input -and $input.Trim()) {
        $Message = $input.Trim()
    } else {
        $Message = $default
    }
}

Write-Step "git add ."
git add .
if ($LASTEXITCODE -ne 0) { Fail "git add failed" }

Write-Step "git commit"
git commit -m $Message
if ($LASTEXITCODE -ne 0) { Fail "git commit failed" }

Write-Step "git push"
git push
if ($LASTEXITCODE -ne 0) {
    Fail "git push failed. Check network, GitHub login, and remote origin."
}

Write-Host ""
Write-Host "[OK] Pushed to GitHub. Pages may update in 1-3 minutes." -ForegroundColor Green
$remote = git remote get-url origin 2>$null
if ($remote) {
    Write-Host "Remote: $remote"
}
