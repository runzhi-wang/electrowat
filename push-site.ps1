# ElectroWat DB - one-click git push
# Usage: .\push-site.ps1
#        .\push-site.ps1 "your commit message"
# Or double-click push-site.bat

param(
    [Parameter(Position = 0)]
    [string]$Message = "",
    [switch]$Interactive
)

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

$script:GitLastOutput = @()

function Invoke-Git {
    param([Parameter(ValueFromRemainingArguments = $true)][string[]]$GitArgs)
    $prev = $ErrorActionPreference
    $ErrorActionPreference = "Continue"
    $out = & git @GitArgs 2>&1
    $code = $LASTEXITCODE
    $ErrorActionPreference = $prev
    $script:GitLastOutput = @($out)
    foreach ($line in $out) {
        if ($line -is [System.Management.Automation.ErrorRecord]) {
            Write-Host $line.ToString()
        } else {
            Write-Host $line
        }
    }
    return $code
}

function Test-GitHasLocalChanges {
    if ((Invoke-Git status --porcelain) -ne 0) {
        Fail "git status failed"
    }
    foreach ($line in $script:GitLastOutput) {
        if ($line -is [string] -and $line.Trim()) {
            return $true
        }
    }
    return $false
}

function Get-GitLastLine {
    foreach ($line in $script:GitLastOutput) {
        if ($line -is [string] -and $line.Trim()) {
            return $line.Trim()
        }
    }
    return ""
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
if (-not (Test-GitHasLocalChanges)) {
    Write-Host ""
    Write-Host "No local changes to commit." -ForegroundColor Yellow
    Write-Step "git push (if commits pending)"
    $pushCode = Invoke-Git push
    if ($pushCode -ne 0) {
        Fail "git push failed. Check network, GitHub login, and remote origin."
    }
    Write-Host ""
    Write-Host "[OK] Already in sync with remote (Everything up-to-date is normal)." -ForegroundColor Green
    if ((Invoke-Git remote get-url origin) -eq 0) {
        $remote = Get-GitLastLine
        if ($remote) { Write-Host "Remote: $remote" }
    }
    exit 0
}

if (-not $Message.Trim()) {
    $default = "Update site " + (Get-Date -Format "yyyy-MM-dd HH:mm")
    if ($Interactive) {
        $input = Read-Host "Commit message (Enter for default)"
        if ($input -and $input.Trim()) {
            $Message = $input.Trim()
        } else {
            $Message = $default
        }
    } else {
        $Message = $default
        Write-Host "Commit message: $Message" -ForegroundColor DarkGray
    }
}

Write-Step "git add ."
if ((Invoke-Git add .) -ne 0) { Fail "git add failed" }

Write-Step "git commit"
if ((Invoke-Git commit -m $Message) -ne 0) { Fail "git commit failed" }

Write-Step "git push"
if ((Invoke-Git push) -ne 0) {
    Fail "git push failed. Check network, GitHub login, and remote origin."
}

Write-Host ""
Write-Host "[OK] Pushed to GitHub. Pages may update in 1-3 minutes." -ForegroundColor Green
if ((Invoke-Git remote get-url origin) -eq 0) {
    $remoteUrl = Get-GitLastLine
    if ($remoteUrl) { Write-Host "Remote: $remoteUrl" }
}
exit 0
