#!/bin/bash

function created() {
  local about=$1
  local filename=$2
  echo "Create $about $filename"
}

function removed() {
  local about=$1
  local filename=$2
  echo "Remove $about $filename"
}

function dir_should_exists() {
  local dir=$1
  if [ ! -d "$dir" ]; then
    mkdir "$dir"
    created "dir" "$dir"
  else
    echo "Skip dir $dir (exists)"
  fi
}

function dir_should_not_exists() {
  local dir=$1
  if [ ! -d "$dir" ]; then
    echo "Skip dir $dir (doesn't exists)"
  else
    rm -rf "$dir"
    removed "dir" "$dir"
  fi
}

function add_new_line() {
  local targetFile=$1
  local pattern=$2
  local insertLine=$3
  local lineNum=$(( $(grep -n "$pattern" "$targetFile" | cut -f1 -d: | tail -1) + 1 ))
  sed -i '' -e "$lineNum"' i\'$'\n'"$insertLine"$'\n' "$targetFile"
}

function remove_lines() {
  local targetFile=$1
  local pattern=$2
  sed -i '' "/$pattern/d" "$targetFile"
}
