#!/bin/bash

TIMESTAMP=$(date +%s)
cp migrations/template.sql.txt migrations/v$TIMESTAMP-$1.sql
