# Guide Enseignant : Scénario de Dépannage - Exemple Complet

> ⚠️ **DOCUMENT CONFIDENTIEL - RÉSERVÉ AUX ENSEIGNANTS**  
> Ce document présente un exemple complet de scénario de dépannage avec storytelling, méthodologie et réparation.

---

## 🔧 Comment Casser la Configuration (Pour l'Enseignant)

### Préparation Avant l'Exercice

**Étape 1 : Sauvegarder une Configuration Fonctionnelle**

Avant de casser quoi que ce soit, assurez-vous d'avoir une sauvegarde de la configuration qui fonctionne :

```cisco
Router# copy running-config tftp:
Address or name of remote host []? 192.168.10.10
Destination filename [router-confg]? R-Nova-backup.cfg
```

Ou sauvegardez localement :
```cisco
Router# copy running-config startup-config
```

**Important :** Notez les IPs, hostnames, et mots de passe utilisés pour pouvoir restaurer facilement.

---

### Comment Casser : Port Routeur Désactivé

**Méthode : Désactiver le port GigabitEthernet0/0**

**Commandes à utiliser :**
```cisco
Router> enable
Router# configure terminal
Router(config)# interface gigabitEthernet0/0
Router(config-if)# shutdown    ← CETTE COMMANDE CASSE LA CONFIG
Router(config-if)# end
```

**Ce qui se passe :**
- Le port GigabitEthernet0/0 est désactivé manuellement
- L'interface passe de "up up" à "administratively down down"
- Le routeur ne peut plus recevoir ni envoyer de paquets sur cette interface
- Le lien peut rester vert dans Packet Tracer (niveau physique), mais aucune communication n'est possible (niveau logique)

**Vérification que c'est bien cassé :**
```cisco
Router# show ip interface brief
```

**Résultat attendu :**
```
Interface                  IP-Address      OK? Method Status                Protocol
GigabitEthernet0/0         192.168.10.1   YES manual administratively down down
```

**Test depuis le PC :**
```
PC> ping 192.168.10.1
```
**Résultat attendu :** ❌ "Request timed out"

---

### ⚠️ Points d'Attention

1. **Ne pas sauvegarder après avoir cassé** : Laissez la config cassée en RAM seulement, ou sauvegardez-la dans un fichier séparé pour pouvoir la restaurer facilement.

2. **Tester avant de donner aux étudiants** : Vérifiez que le problème est bien reproduit et que la méthodologie fonctionne.

3. **Documenter** : Notez exactement ce qui a été modifié pour pouvoir guider les étudiants si nécessaire.

4. **Préparer la solution** : Ayez la commande de réparation prête (`no shutdown`) pour pouvoir aider rapidement.

---

### 🔄 Comment Restaurer Rapidement (Si Besoin)

**Option 1 : Réparer manuellement**
```cisco
Router# configure terminal
Router(config)# interface gigabitEthernet0/0
Router(config-if)# no shutdown
Router(config-if)# end
```

**Option 2 : Restaurer depuis une sauvegarde**
```cisco
Router# copy tftp: startup-config
Address or name of remote host []? 192.168.10.10
Source filename []? R-Nova-backup.cfg
Router# reload
```

---

## Scénario : Le Routeur qui Ne Répond Pas

### 📖 Histoire / Storytelling

**Contexte :**
Vous êtes administrateur réseau chez NovaTech, une petite entreprise. Ce matin, un employé du service informatique vous appelle en panique : "Rien ne fonctionne ! Les PC ne peuvent plus accéder à Internet, et même le serveur interne ne répond plus !"

**La Situation :**
- Hier soir, tout fonctionnait parfaitement
- Ce matin, aucun PC ne peut communiquer avec le routeur
- Les liens sont verts dans Packet Tracer (donc les câbles sont OK)
- Les IPs semblent correctes quand vous les vérifiez
- Mais le ping depuis n'importe quel PC vers le routeur échoue complètement

**Le Mystère :**
Vous savez que :
- Le routeur R-Nova a l'IP 192.168.10.1
- Le PC Tech-PC a l'IP 192.168.10.20
- Ils sont dans le même réseau (192.168.10.0/24)
- Les câbles sont bien branchés (liens verts)
- Mais... rien ne fonctionne !

**Votre Mission :**
Trouver pourquoi le routeur ne répond pas et le réparer avant que le patron n'arrive et que toute l'entreprise soit bloquée !

---

### 🔍 Méthodologie de Dépannage

#### Étape 1 : Constater le Symptôme Précisément

**Action à faire :**
Depuis le PC Tech-PC, ouvrir le terminal et tester la connectivité :
```
PC> ping 192.168.10.1
```

**Résultat observé :**
```
Pinging 192.168.10.1 with 32 bytes of data:

Request timed out.
Request timed out.
Request timed out.
Request timed out.

Ping statistics for 192.168.10.1:
    Packets: Sent = 4, Received = 0, Lost = 4 (100% loss)
```

**Observation :**
- ❌ Le ping échoue complètement
- Le routeur ne répond pas du tout
- Le lien est vert dans Packet Tracer (donc pas de problème de câblage)

**Question à se poser :**
"Pourquoi le routeur ne répond-il pas alors que le lien est vert ?"

---

#### Étape 2 : Vérifier la Connectivité Physique

**Action à faire :**
Inspection visuelle dans Packet Tracer

**Vérifications :**
- [ ] Le lien entre le switch et le routeur est-il vert ? ✅ OUI
- [ ] Les câbles sont-ils bien branchés ? ✅ OUI
- [ ] Les équipements sont-ils allumés ? ✅ OUI

**Conclusion :**
La connectivité physique est OK. Le problème n'est pas au niveau du câblage.

**Action suivante :**
Passer à la vérification de la configuration réseau.

---

#### Étape 3 : Vérifier l'État de l'Interface Routeur

**Action à faire :**
Se connecter au routeur en console et vérifier l'état des interfaces

**Commande à utiliser :**
```cisco
Router> enable
Router# show ip interface brief
```

**Résultat observé :**
```
Interface                  IP-Address      OK? Method Status                Protocol
GigabitEthernet0/0         192.168.10.1   YES manual administratively down down
GigabitEthernet0/1         unassigned      YES NVRAM  administratively down down
Vlan1                       unassigned      YES NVRAM  administratively down down
```

**🔴 PROBLÈME DÉTECTÉ !**

**Observation critique :**
- L'interface GigabitEthernet0/0 a bien l'IP 192.168.10.1 ✅
- MAIS le Status est "administratively down" ❌
- ET le Protocol est "down" ❌

**Que signifie "administratively down" ?**
- Cela signifie que le port a été **désactivé manuellement** avec la commande `shutdown`
- Le port n'est pas cassé physiquement, mais il a été "éteint" par configuration
- C'est comme si vous aviez débranché le câble, mais en logiciel

**Diagnostic :**
Le port du routeur est désactivé. C'est pour ça qu'il ne répond pas, même si le lien est vert dans Packet Tracer (le lien est vert au niveau physique, mais le port est désactivé au niveau logiciel).

---

#### Étape 4 : Vérifier la Configuration de l'Interface

**Action à faire :**
Vérifier la configuration complète de l'interface pour confirmer le diagnostic

**Commande à utiliser :**
```cisco
Router# show running-config interface gigabitEthernet0/0
```

**Résultat observé :**
```
interface GigabitEthernet0/0
 ip address 192.168.10.1 255.255.255.0
 shutdown
 duplex auto
 speed auto
```

**🔴 CONFIRMATION DU PROBLÈME !**

**Observation :**
- La ligne `shutdown` est présente dans la configuration
- C'est cette ligne qui désactive le port

**Explication :**
Quelqu'un (peut-être un collègue qui testait, ou une erreur de manipulation) a tapé `shutdown` sur cette interface. Le port est maintenant désactivé, donc aucune communication n'est possible, même si tout le reste est correct.

---

#### Étape 5 : Identifier la Cause Racine

**Questions à se poser :**
- Pourquoi le port a-t-il été désactivé ?
- Quand cela s'est-il produit ?
- Qui a fait cette modification ?

**Hypothèses possibles :**
1. Un collègue a testé quelque chose hier soir et a oublié de réactiver le port
2. Une erreur de frappe lors d'une configuration
3. Un script de maintenance qui a mal tourné
4. Une sauvegarde/restauration qui a restauré une ancienne config avec le port désactivé

**Peu importe la cause** : L'important est de réparer maintenant !

---

### 🔧 Réparation

#### Solution : Activer le Port

**Action à faire :**
Entrer en mode configuration de l'interface et activer le port

**Commandes à utiliser :**
```cisco
Router# configure terminal
Router(config)# interface gigabitEthernet0/0
Router(config-if)# no shutdown
Router(config-if)# end
```

**Explication de chaque commande :**
- `configure terminal` : Entrer en mode configuration globale
- `interface gigabitEthernet0/0` : Sélectionner l'interface concernée
- `no shutdown` : **Activer le port** (retirer la commande shutdown)
- `end` : Sortir du mode configuration

**Ce qui se passe :**
- La commande `no shutdown` retire la ligne `shutdown` de la configuration
- Le port passe de l'état "administratively down" à "up"
- Le routeur peut maintenant recevoir et envoyer des paquets

---

#### Vérification Immédiate

**Action à faire :**
Vérifier que le port est maintenant actif

**Commande à utiliser :**
```cisco
Router# show ip interface brief
```

**Résultat attendu :**
```
Interface                  IP-Address      OK? Method Status                Protocol
GigabitEthernet0/0         192.168.10.1   YES manual up                    up
GigabitEthernet0/1         unassigned      YES NVRAM  administratively down down
Vlan1                       unassigned      YES NVRAM  administratively down down
```

**✅ SUCCÈS !**

**Observation :**
- Le Status est maintenant "up" ✅
- Le Protocol est maintenant "up" ✅
- Le port est actif et opérationnel !

**Note :** Attendre quelques secondes pour que le lien se stabilise (il peut passer de orange à vert).

---

#### Test Final de Connectivité

**Action à faire :**
Tester depuis le PC que tout fonctionne maintenant

**Depuis le PC :**
```
PC> ping 192.168.10.1
```

**Résultat attendu :**
```
Pinging 192.168.10.1 with 32 bytes of data:

Reply from 192.168.10.1: bytes=32 time=1ms TTL=64
Reply from 192.168.10.1: bytes=32 time=1ms TTL=64
Reply from 192.168.10.1: bytes=32 time=1ms TTL=64
Reply from 192.168.10.1: bytes=32 time=1ms TTL=64

Ping statistics for 192.168.10.1:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)
```

**🎉 PROBLÈME RÉSOLU !**

Le routeur répond maintenant parfaitement. La connectivité est rétablie !

---

#### Sauvegarde de la Configuration

**⚠️ IMPORTANT : Ne pas oublier de sauvegarder !**

**Action à faire :**
Sauvegarder la configuration pour qu'elle persiste après redémarrage

**Commande à utiliser :**
```cisco
Router# copy running-config startup-config
```

**Ou en raccourci :**
```cisco
Router# wr
```

**Pourquoi c'est important :**
- Sans cette sauvegarde, si le routeur redémarre, le port sera à nouveau désactivé
- La commande `no shutdown` était seulement en RAM (running-config)
- Il faut la sauvegarder en NVRAM (startup-config) pour qu'elle persiste

**Vérification :**
```cisco
Router# show startup-config | include interface GigabitEthernet0/0
```

**Résultat attendu :**
```
interface GigabitEthernet0/0
 ip address 192.168.10.1 255.255.255.0
 duplex auto
 speed auto
```

**Observation :** Plus de ligne `shutdown` dans la startup-config ✅

---

### 📋 Résumé de la Méthodologie

**Checklist de dépannage utilisée :**

1. ✅ **Constater le symptôme** : Ping échoue
2. ✅ **Vérifier la connectivité physique** : Liens verts OK
3. ✅ **Vérifier l'état des interfaces** : `show ip interface brief` → "down down"
4. ✅ **Vérifier la configuration** : `show running-config interface` → ligne `shutdown`
5. ✅ **Diagnostiquer** : Port désactivé manuellement
6. ✅ **Réparer** : `no shutdown`
7. ✅ **Vérifier** : Interface "up up"
8. ✅ **Tester** : Ping fonctionne
9. ✅ **Sauvegarder** : `copy running-config startup-config`

---

### 💡 Points Clés à Retenir

**Pour les étudiants :**

1. **"administratively down"** = Port désactivé manuellement avec `shutdown`
   - Différent de "down" (problème physique)
   - Solution : `no shutdown`

2. **Toujours vérifier l'état des interfaces** avec `show ip interface brief`
   - C'est la première chose à faire quand le ping échoue
   - Même si les IPs semblent correctes

3. **Ne pas oublier de sauvegarder** après chaque réparation
   - `copy running-config startup-config`
   - Sinon, la réparation sera perdue au redémarrage

4. **Méthodologie systématique** :
   - Symptôme → Vérifications → Diagnostic → Réparation → Test → Sauvegarde

---

### 🎓 Indices à Donner aux Étudiants (si bloqués)

**Si l'étudiant ne trouve pas :**
- "Regardez l'état de l'interface avec `show ip interface brief`"
- "Que signifie 'down down' ou 'administratively down' ?"
- "Quelle commande active un port ? (Pensez à 'no shutdown')"
- "Même si le lien est vert, le port peut être désactivé au niveau logiciel"

**Si l'étudiant trouve mais ne sait pas réparer :**
- "Comment retirer une commande dans Cisco ? (Utilisez 'no' devant la commande)"
- "Quelle commande retire 'shutdown' ? (`no shutdown`)"
- "N'oubliez pas de sauvegarder après la réparation !"

---

### 📊 Tableau Récapitulatif

| Étape | Action | Commande | Résultat Attendu |
|-------|--------|----------|------------------|
| 1 | Constater le symptôme | `ping 192.168.10.1` | ❌ Timeout |
| 2 | Vérifier physique | Inspection visuelle | ✅ Liens verts |
| 3 | Vérifier état interface | `show ip interface brief` | ❌ "down down" |
| 4 | Vérifier config | `show running-config interface g0/0` | ❌ Ligne `shutdown` |
| 5 | Réparer | `no shutdown` | ✅ Port activé |
| 6 | Vérifier | `show ip interface brief` | ✅ "up up" |
| 7 | Tester | `ping 192.168.10.1` | ✅ Reply |
| 8 | Sauvegarder | `copy run start` | ✅ Config sauvegardée |

---

*Ce scénario peut être utilisé comme modèle pour créer d'autres scénarios de dépannage avec la même structure : Histoire → Méthodologie → Réparation.*
