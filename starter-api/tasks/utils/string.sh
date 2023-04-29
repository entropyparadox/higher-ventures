#!/bin/bash

function pascal_case() {
  echo "$1" | perl -pe 's/(^|_|-)./uc($&)/ge;s/[_-]//g'
}

function camel_case() {
  pascal_case "$1" | perl -pe 's/^\w/lc($&)/ge'
}

function snake_case() {
  echo "$1" | sed -r 's/[-_]+/-/g' | perl -pe 's/[A-Z]+/-lc($&)/ge;s/-+/_/g' | sed -r 's/^_//g'
}

function hyphen_case() {
  snake_case "$1" | sed -r 's/[-_]+/-/g'
}
