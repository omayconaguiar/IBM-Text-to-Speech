#!/bin/bash
echo " =========================================  "
echo "            Iniciando Migracao"
echo " =========================================  "


for migration in $(ls v*.sql | sort); do
	if [[ $migration > $version && $migration == *.sql ]]; then
		echo
    	echo " ==========  Executando migracao: $migration ==========  "
		mysql -h localhost -U postgres -d test < $migration
	fi
done

echo " =========================================  "
echo "              Fim na Migracao"
echo " =========================================  "
