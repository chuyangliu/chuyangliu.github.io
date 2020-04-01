$ErrorActionPreference = "Stop"

$RepoRemote = "git@github.com:chuyangliu/chuyangliu.github.io.git"
$RepoBranch = "pages"
$RepoPath = $RepoBranch
$RepoRoot = (Get-Location).Path
$RepoDist = "$RepoRoot\out\dist\*"
$CurrentTime = (Get-Date).ToUniversalTime().ToString("yyyy-MM-dd HH:mm:ss") + " UTC"

npm install
npm run lint
npm run build

if (Test-Path $RepoPath) {
    Remove-Item $RepoPath -Force -Recurse
}

git clone -b $RepoBranch --single-branch $RepoRemote $RepoPath
Set-Location $RepoPath

foreach ($File in (Get-ChildItem)) {
    Remove-Item $File -Force -Recurse
}
Copy-Item $RepoDist . -Force -Recurse

git add -A
git commit -m $CurrentTime
git push origin $RepoBranch

Set-Location $RepoRoot
