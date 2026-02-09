# Scénarios de Dépannage - Lab 1 Session 1

## Guide pour les étudiants : Trouver et corriger les erreurs de configuration

Ce document contient des scénarios où la configuration réseau a été "cassée". Votre mission : identifier l'erreur et expliquer comment la corriger.

---

## Scénario 1 : Le PC ne peut pas ping le routeur

### Symptôme :
- Le PC (192.168.10.20) ne peut pas ping le routeur (192.168.10.1)
- Le lien entre le switch et le routeur est vert
- Les IP semblent correctes

### Erreur possible :
- Le port du routeur n'a pas été activé avec `no shutdown`
- L'IP du routeur n'a pas été configurée sur la bonne interface
- Le masque de sous-réseau est incorrect

### Indices pour les étudiants :
- Vérifier avec `show ip interface brief` sur le routeur
- Vérifier que l'interface est "up up" et non "down down"
- Vérifier que l'IP 192.168.10.1 est bien sur GigabitEthernet0/0

---

## Scénario 2 : Le switch ne peut pas communiquer avec le routeur

### Symptôme :
- Le switch a une IP (192.168.10.2)
- Le routeur répond au ping depuis le PC
- Le switch ne peut pas ping le routeur ni le PC

### Erreur possible :
- L'interface VLAN 1 du switch n'a pas été activée avec `no shutdown`
- La passerelle par défaut (`ip default-gateway`) n'a pas été configurée
- L'IP du switch est dans un autre réseau (ex: 192.168.20.2 au lieu de 192.168.10.2)

### Indices pour les étudiants :
- Vérifier avec `show ip interface vlan 1` sur le switch
- Vérifier la passerelle avec `show running-config | include default-gateway`
- Comparer les masques de sous-réseau

---

## Scénario 3 : Le PC ne peut pas ping le serveur TFTP

### Symptôme :
- Le PC peut ping le routeur
- Le serveur TFTP a une IP (192.168.10.10)
- Le ping du PC vers le serveur échoue

### Erreur possible :
- Le serveur TFTP n'a pas de gateway configurée
- Le serveur TFTP est sur un autre switch non connecté au même réseau
- L'IP du serveur est incorrecte (ex: 192.168.1.10 au lieu de 192.168.10.10)

### Indices pour les étudiants :
- Vérifier la configuration IP du serveur (Desktop → IP Configuration)
- Vérifier que le serveur est branché sur le même switch que le PC ou sur un switch connecté
- Vérifier la gateway du serveur (192.168.10.1)

---

## Scénario 4 : La sauvegarde TFTP échoue

### Symptôme :
- La commande `copy startup-config tftp:` est tapée
- Le routeur demande l'IP du serveur TFTP
- Après avoir entré 192.168.10.10, erreur "Connection timed out" ou "Network unreachable"

### Erreur possible :
- Le service TFTP n'est pas activé sur le serveur
- Le serveur TFTP n'a pas d'IP configurée
- Le routeur ne peut pas joindre le serveur (pas de route, gateway manquante)

### Indices pour les étudiants :
- Vérifier que le service TFTP est ON dans Services → TFTP
- Vérifier l'IP du serveur avec `ping 192.168.10.10` depuis le routeur
- Vérifier la connectivité réseau de base

---

## Scénario 5 : Les mots de passe ne fonctionnent pas après redémarrage

### Symptôme :
- Les mots de passe console et enable ont été configurés
- Après redémarrage du routeur, les mots de passe ne sont plus demandés
- La configuration semble avoir disparu

### Erreur possible :
- La commande `copy running-config startup-config` n'a pas été exécutée
- Le routeur charge la startup-config vide au démarrage
- Les mots de passe étaient seulement en RAM (running-config)

### Indices pour les étudiants :
- Vérifier avec `show startup-config` si les mots de passe y sont présents
- Rappeler la différence entre running-config (RAM) et startup-config (NVRAM)
- Vérifier que la sauvegarde a bien été faite avant le redémarrage

---

## Scénario 6 : Le routeur ne répond pas du tout

### Symptôme :
- Aucun ping ne fonctionne vers le routeur
- Le lien physique est vert
- L'IP semble correcte dans la config

### Erreur possible :
- L'IP a été configurée sur la mauvaise interface (ex: GigabitEthernet0/1 au lieu de 0/0)
- Le port utilisé n'est pas celui connecté au switch
- L'interface est en mode shutdown

### Indices pour les étudiants :
- Vérifier quel port est connecté au switch (inspection visuelle dans Packet Tracer)
- Vérifier avec `show ip interface brief` quelle interface a l'IP
- Vérifier l'état de chaque interface (up/down)

---

## Scénario 7 : Les deux switches ne peuvent pas communiquer

### Symptôme :
- SW-Entrée (192.168.10.2) et SW-Bureau (192.168.10.3) sont configurés
- Aucun des deux ne peut ping l'autre ni le routeur
- Les liens sont verts

### Erreur possible :
- Les deux switches n'ont pas de gateway configurée (`ip default-gateway`)
- Les interfaces VLAN 1 ne sont pas activées (`no shutdown`)
- Les IP sont dans des réseaux différents

### Indices pour les étudiants :
- Vérifier la configuration VLAN 1 sur chaque switch
- Vérifier la présence de `ip default-gateway 192.168.10.1` sur chaque switch
- Tester la connectivité de base avec `ping` depuis chaque switch

---

## Scénario 8 : Le hostname ne change pas

### Symptôme :
- La commande `hostname R-Nova` a été tapée
- Le prompt affiche toujours "Router(config)#" au lieu de "R-Nova(config)#"

### Erreur possible :
- La commande a été tapée en mode utilisateur (>) au lieu de mode config
- La commande a été tapée mais un `exit` a été fait trop tôt
- La configuration n'a pas été sauvegardée et le routeur a redémarré

### Indices pour les étudiants :
- Vérifier le mode actuel (>, #, ou (config)#)
- Vérifier avec `show running-config | include hostname`
- Rappeler l'ordre : enable → configure terminal → hostname

---

## Scénario 9 : Le DNS bloque tout

### Symptôme :
- Chaque faute de frappe dans le CLI fait attendre 30 secondes
- Le routeur essaie de résoudre les commandes comme des noms de domaine
- La configuration est très lente

### Erreur possible :
- La commande `no ip domain-lookup` n'a pas été exécutée
- Le DNS est toujours activé par défaut

### Indices pour les étudiants :
- Vérifier avec `show running-config | include domain-lookup`
- Ajouter `no ip domain-lookup` en mode config global
- Tester en tapant une commande incorrecte (devrait donner une erreur immédiate)

---

## Scénario 10 : Configuration mixte — plusieurs erreurs

### Symptôme :
- Le PC peut ping le routeur mais pas le serveur TFTP
- Le switch SW-Entrée peut ping le routeur mais pas SW-Bureau
- La sauvegarde TFTP échoue

### Erreurs possibles :
- Combinaison de plusieurs problèmes :
  - Serveur TFTP sans gateway
  - Switches sans gateway
  - Service TFTP non activé
  - IPs dans des réseaux différents

### Indices pour les étudiants :
- Méthodologie : tester chaque connexion une par une
- Commencer par vérifier la connectivité de base (ping)
- Vérifier les gateways de tous les équipements
- Vérifier que tous les équipements sont dans le même réseau (192.168.10.0/24)

---

## Méthodologie de Dépannage Recommandée

### Étapes systématiques :

1. **Vérifier la connectivité physique**
   - Les liens sont-ils verts dans Packet Tracer ?
   - Les câbles sont-ils bien branchés ?

2. **Vérifier les IPs**
   - Tous les équipements sont-ils dans le même réseau (192.168.10.0/24) ?
   - Les masques de sous-réseau sont-ils cohérents (255.255.255.0) ?

3. **Vérifier les gateways**
   - Les switches ont-ils `ip default-gateway 192.168.10.1` ?
   - Le PC et le serveur TFTP ont-ils la gateway 192.168.10.1 ?

4. **Vérifier l'état des interfaces**
   - Utiliser `show ip interface brief` sur routeur et switches
   - Les interfaces doivent être "up up", pas "down down"

5. **Tester avec ping de proche en proche**
   - PC → Routeur
   - PC → Switch
   - PC → Serveur TFTP
   - Routeur → Switch
   - Switch → Routeur

6. **Vérifier les services**
   - Le service TFTP est-il activé sur le serveur ?
   - Les mots de passe sont-ils configurés correctement ?

7. **Vérifier les sauvegardes**
   - `show running-config` vs `show startup-config`
   - La configuration est-elle sauvegardée en NVRAM ?

---

## Commandes de Diagnostic Utiles

### Sur le routeur :
```cisco
show ip interface brief          # État de toutes les interfaces
show running-config               # Configuration actuelle
show startup-config               # Configuration sauvegardée
ping 192.168.10.2                 # Tester la connectivité vers le switch
ping 192.168.10.10                # Tester la connectivité vers le serveur TFTP
```

### Sur le switch :
```cisco
show ip interface vlan 1           # État de l'interface VLAN 1
show running-config | include default-gateway  # Vérifier la gateway
ping 192.168.10.1                  # Tester la connectivité vers le routeur
ping 192.168.10.20                  # Tester la connectivité vers le PC
```

### Depuis le PC :
- Desktop → Command Prompt → `ping 192.168.10.1`
- Desktop → Command Prompt → `ping 192.168.10.2`
- Desktop → Command Prompt → `ping 192.168.10.10`

---

## Checklist de Vérification Rapide

- [ ] Routeur : IP 192.168.10.1 sur GigabitEthernet0/0
- [ ] Routeur : Interface activée (`no shutdown`)
- [ ] Routeur : Hostname configuré (R-Nova)
- [ ] Routeur : DNS désactivé (`no ip domain-lookup`)
- [ ] Routeur : Mots de passe configurés (console + enable secret)
- [ ] Routeur : Configuration sauvegardée (`copy run start`)
- [ ] Switch SW-Entrée : IP 192.168.10.2 sur VLAN 1
- [ ] Switch SW-Entrée : VLAN 1 activé (`no shutdown`)
- [ ] Switch SW-Entrée : Gateway configurée (`ip default-gateway 192.168.10.1`)
- [ ] Switch SW-Bureau : IP 192.168.10.3 sur VLAN 1
- [ ] Switch SW-Bureau : VLAN 1 activé (`no shutdown`)
- [ ] Switch SW-Bureau : Gateway configurée (`ip default-gateway 192.168.10.1`)
- [ ] PC : IP 192.168.10.20 avec gateway 192.168.10.1
- [ ] Serveur TFTP : IP 192.168.10.10 avec gateway 192.168.10.1
- [ ] Serveur TFTP : Service TFTP activé (Services → TFTP → ON)
- [ ] Tous les équipements : Ping fonctionnel entre eux

---

## Conseils pour les Étudiants

1. **Ne paniquez pas** : Les erreurs sont normales et font partie de l'apprentissage
2. **Soyez méthodique** : Suivez les étapes de dépannage dans l'ordre
3. **Documentez** : Notez ce que vous testez et les résultats
4. **Testez une chose à la fois** : Ne changez pas plusieurs choses en même temps
5. **Utilisez les commandes show** : Elles sont vos meilleures amies pour diagnostiquer
6. **Vérifiez les bases d'abord** : IP, masque, gateway avant d'aller plus loin
7. **Pensez en couches** : Physique → IP → Services

---

*Bon dépannage ! 🛠️*
