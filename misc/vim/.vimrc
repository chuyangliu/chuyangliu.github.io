set number                      " Show line number
set mouse=n                     " Enable mouse in normal mode
set encoding=utf-8              " Encoding
set noignorecase                " Case-sensitive when matching
set backspace=indent,eol,start  " Backspace function

" Indent
set autoindent
set cindent
set smartindent
set softtabstop=4
set shiftwidth=4
set tabstop=4
set expandtab     " Use space
"set noexpandtab  " Use tab

" Multiple cursors
set runtimepath+=~/.vim/bundle/vim-multiple-cursors

" Auto pairs
set runtimepath+=~/.vim/bundle/auto-pairs
let g:AutoPairs={'(':')','[':']','{':'}',"'":"'",'"':'"','`':'`'}

" NERDTree
set runtimepath+=~/.vim/bundle/nerdtree
set runtimepath+=~/.vim/bundle/vim-nerdtree-tabs
let g:nerdtree_tabs_open_on_console_startup=1
let NERDTreeShowHidden=1
autocmd StdinReadPre * let s:std_in=1
autocmd VimEnter * if argc() == 1 && isdirectory(argv()[0]) && !exists("s:std_in") | exe 'NERDTree' argv()[0] | wincmd p | ene | endif

" Syntax (https://github.com/morhetz/gruvbox/wiki/Configuration)
set t_Co=256
set runtimepath+=~/.vim/bundle/gruvbox
let g:gruvbox_bold=1
let g:gruvbox_italic=0
let g:gruvbox_underline=1
let g:gruvbox_undercurl=1
let g:gruvbox_termcolors=256
let g:gruvbox_contrast_dark='hard'
set background=dark
colorscheme gruvbox
