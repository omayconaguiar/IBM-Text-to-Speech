#!/bin/bash

how_to_use() {
	echo
	echo "$0 env version"
	echo "    Instala todas as migracoes necessarias a partir da versao informada para que o banco fique na versao mais atualizada"
	echo
	echo "    env: Ambiente de desenvolvimento"
	echo "        [test]"
	echo "    version: Versao atual do banco"
	echo "        v0"
}

env="$1"
version="$2"

# Converte o env no banco certo
if [ "$env" = "local" ]; then
	database="mysql"
else
	how_to_use
	exit 1
fi

# Se a versao nao foi informada exibe o menu de ajuda
if [[ -z $version || $version != v* ]] ; then
	how_to_use
	exit 1
fi

echo " =========================================  "
echo "            Iniciando Migracao"
echo " =========================================  "


for migration in $(ls v*.sql | sort); do
	if [[ $migration > $version && $migration == *.sql ]]; then
		echo
    	echo " ==========  Executando migracao: $migration ==========  "
		postgres -h localhost -U root -d $database < $migration
	fi
done

echo " =========================================  "
echo "              Fim na Migracao"
echo " =========================================  "
