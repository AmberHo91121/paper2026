# 用 .NET ZipArchive 手動打包，避免 Compress-Archive 在 Windows 上
# 用反斜線當 zip 內部路徑分隔符號的問題（Firefox/Zotero 的 zip 解析器對此很嚴格）。

$ErrorActionPreference = "Stop"
$pluginDir = $PSScriptRoot
$xpiPath = Join-Path $pluginDir "kaokaonan.xpi"

if (Test-Path $xpiPath) { Remove-Item $xpiPath -Force }

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$files = @(
  @{ Src = Join-Path $pluginDir "manifest.json"; Entry = "manifest.json" },
  @{ Src = Join-Path $pluginDir "bootstrap.js"; Entry = "bootstrap.js" },
  @{ Src = Join-Path $pluginDir "src\avatar.svg"; Entry = "src/avatar.svg" },
  @{ Src = Join-Path $pluginDir "src\kaokaonan.js"; Entry = "src/kaokaonan.js" }
)

$fs = [System.IO.File]::Open($xpiPath, [System.IO.FileMode]::CreateNew)
$archive = New-Object System.IO.Compression.ZipArchive($fs, [System.IO.Compression.ZipArchiveMode]::Create)
foreach ($f in $files) {
  [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
    $archive, $f.Src, $f.Entry, [System.IO.Compression.CompressionLevel]::Optimal
  ) | Out-Null
}
$archive.Dispose()
$fs.Dispose()

Write-Host "已打包: $xpiPath"
