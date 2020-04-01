function Set-LocationRepo {
    Set-Location $env:USERPROFILE\repo\
}

Set-Alias -Name rr -Value Set-LocationRepo
