# Scénario de Dépannage — Sessions 1 & 2

Ce document combine les notions de la **Session 1** (sécurisation, commandes show) et de la **Session 2** (VLAN, ports access). Il est organisé en quatre parties :

1. **Comment créer la configuration** sur Cisco Packet Tracer
2. **Contexte / Storytelling / Problème** : la mise en situation
3. **Logique pour trouver le problème** : la démarche de dépannage
4. **Résolution du problème** : la correction à apporter

**Un seul problème** à identifier et corriger.

---

# PARTIE 1 — Comment créer la configuration sur Cisco Packet Tracer

## 1.1 Câblage et topologie

1. **Ouvrir Cisco Packet Tracer** et créer une nouvelle topologie.

2. **Ajouter les équipements :**
   - 2 switches **2960** (ou équivalent)
   - 1 PC

3. **Câbler :**
   - **PC Admin** → port **Fa0/1** de **SW-Core** (câble droit)
   - **SW-Core** port **Fa0/2** ↔ **SW-Dist** port **Fa0/1** (trunk inter-switch)

4. **Renommer les équipements** (recommandé) :
   - Switch0 → **SW-Core**
   - Switch1 → **SW-Dist**
   - PC0 → **PC Admin**

---

## 1.2 Configuration de base (configuration fonctionnelle)

Créez d’abord une **configuration qui fonctionne**. Ensuite, introduisez l’unique erreur pour l’exercice.

### Sur SW-Core

| Étape | Commande(s) |
|-------|-------------|
| Hostname | `hostname SW-Core` |
| Désactiver DNS | `no ip domain-lookup` |
| Mot de passe | `enable secret cisco123` |
| Créer VLAN 99 | `vlan 99` → `name Management` → `exit` |
| Interface VLAN 99 | `interface vlan 99` → `ip address 192.168.99.2 255.255.255.0` → `no shutdown` → `exit` |
| Port PC Admin (Fa0/1) | `interface fastEthernet0/1` → `switchport mode access` → `switchport access vlan 99` → `no shutdown` → `exit` |
| Trunk (Fa0/2) | `interface fastEthernet0/2` → `switchport mode trunk` → `switchport trunk native vlan 99` → `switchport trunk allowed vlan 99` → `switchport nonegotiate` → `no shutdown` → `exit` |
| Sauvegarder | `copy running-config startup-config` |

### Sur SW-Dist

| Étape | Commande(s) |
|-------|-------------|
| Hostname | `hostname SW-Dist` |
| Désactiver DNS | `no ip domain-lookup` |
| Mot de passe | `enable secret cisco123` |
| Créer VLAN 99 | `vlan 99` → `name Management` → `exit` |
| Interface VLAN 99 | `interface vlan 99` → `ip address 192.168.99.3 255.255.255.0` → `no shutdown` → `exit` |
| Trunk (Fa0/1) | `interface fastEthernet0/1` → `switchport mode trunk` → `switchport trunk native vlan 99` → `switchport trunk allowed vlan 99` → `switchport nonegotiate` → `no shutdown` → `exit` |
| Sauvegarder | `copy running-config startup-config` |

### Sur le PC Admin

- **Desktop → IP Configuration :**
  - IP : `192.168.99.10`
  - Subnet Mask : `255.255.255.0`

**Vérification :** depuis le PC Admin, `ping 192.168.99.2` et `ping 192.168.99.3` doivent fonctionner.

---

## 1.3 Introduire l’erreur (pour l’exercice de dépannage)

Pour simuler l’intervention du « stagiaire », appliquez **une seule** modification :

**Sur SW-Core**, sur le port où le PC Admin est branché (Fa0/1) :

```
SW-Core# configure terminal
SW-Core(config)# interface fastEthernet0/1
SW-Core(config-if)# switchport access vlan 1
SW-Core(config-if)# exit
SW-Core(config)# exit
```

Le port Fa0/1 passe du VLAN 99 au VLAN 1. **Ne pas sauvegarder** : l’élève réparera puis sauvegardera.

---

# PARTIE 2 — Contexte / Storytelling / Problème

## 2.1 Contexte : NovaTech, lundi matin

Vous êtes administrateur réseau chez **NovaTech**. Le réseau local comporte :

- **SW-Core** et **SW-Dist** : deux switches reliés par un lien trunk (SW-Core Fa0/2 ↔ SW-Dist Fa0/1)
- **PC Admin** : poste de gestion branché sur SW-Core (port Fa0/1), utilisé pour accéder aux switches en SSH ou en ping
- **VLAN 99** : VLAN de management (réseau 192.168.99.0/24)

**Table d’adressage :**

| Équipement | Interface        | Adresse IP     | Masque           | VLAN |
|------------|------------------|----------------|------------------|------|
| SW-Core    | VLAN 99 (SVI)    | 192.168.99.2   | 255.255.255.0    | 99   |
| SW-Dist    | VLAN 99 (SVI)    | 192.168.99.3   | 255.255.255.0    | 99   |
| PC Admin   | Carte réseau     | 192.168.99.10  | 255.255.255.0    | 99   |

---

## 2.2 Le problème

**Vendredi soir**, tout fonctionnait : depuis le PC Admin, vous pouviez faire `ping 192.168.99.2`, `ping 192.168.99.3`, et vous connecter en SSH aux deux switches.

**Lundi matin**, un collègue vous appelle :  
*« Le PC Admin ne répond plus ! On ne peut plus accéder aux switches. Un stagiaire a fait des modifications vendredi après-midi avant de partir. »*

### Symptômes observés

- Le PC Admin (192.168.99.10) **ne peut plus ping** SW-Core (192.168.99.2)
- Le PC Admin **ne peut plus ping** SW-Dist (192.168.99.3)
- Les liens physiques sont **verts** dans Packet Tracer (câblage OK)

### Mission

1. **Diagnostiquer** la cause du dysfonctionnement
2. **Proposer les commandes de correction** sur le bon appareil
3. **Expliquer** pourquoi cette erreur provoque le symptôme observé

---

# PARTIE 3 — Logique pour trouver le problème

## 3.1 Méthodologie générale

Suivre une démarche **structurée** et **de bas en haut** (physique → couche 2 → couche 3) :

```
1. Symptôme          → Qui ne communique plus avec qui ?
2. Couche physique   → Liens verts ? Câbles bien branchés ?
3. Couche 2 (VLAN)   → Le port du PC Admin est-il dans le bon VLAN ?
4. Couche 3 (IP)     → Adresses, état des interfaces (si besoin)
```

---

## 3.2 Ordre des vérifications

### Étape A — Constater le symptôme

**Action :** Depuis le PC Admin, ouvrir **Desktop → Command Prompt**.

```
C:\> ping 192.168.99.2
C:\> ping 192.168.99.3
```

**Si « Request timed out »** → Le trafic ne traverse pas correctement le réseau.

---

### Étape B — Éliminer la couche physique

**Action :** Inspection visuelle dans Packet Tracer.

- Le lien PC Admin ↔ SW-Core est-il **vert** ?
- Le lien SW-Core Fa0/2 ↔ SW-Dist Fa0/1 est-il **vert** ?

**Conclusion :** Si les liens sont verts, le problème n’est **pas** au niveau physique.

---

### Étape C — Vérifier la couche 2 : le port du PC Admin est-il dans le bon VLAN ?

**Où :** Sur **SW-Core** (switch où le PC Admin est branché).

**Commande :**
```
SW-Core# show vlan brief
```

**À vérifier :**
- Le port **Fa0/1** (où le PC Admin est branché) doit apparaître dans le **VLAN 99**
- Si Fa0/1 apparaît dans le **VLAN 1** → **Problème trouvé** : le port est dans le mauvais VLAN

**Pourquoi ça casse :** Le PC Admin envoie des trames non taguées et est censé être dans le VLAN 99. Si le port est configuré en VLAN 1, le switch associe le trafic du PC au VLAN 1. Les switches ont leur adresse IP sur l’interface VLAN 99 (SVI). Le PC et les switches ne sont plus dans le même domaine de broadcast : ils ne peuvent pas communiquer.

---

## 3.3 Synthèse de la logique

| Vérification      | Commande              | Ce qu’on cherche     | Problème si…     |
|-------------------|-----------------------|----------------------|------------------|
| Port PC Admin     | `show vlan brief`     | Fa0/1 dans VLAN 99   | Fa0/1 dans VLAN 1 |

---

## 3.4 Indice (si vous êtes bloqués)

<details>
<summary>Indice — Vérifier l’appartenance du port du PC Admin</summary>

Le PC Admin doit être dans le VLAN 99. Sur le switch où il est branché (SW-Core), vérifiez avec `show vlan brief` que le port du PC Admin (Fa0/1) apparaît bien dans le VLAN 99 et non dans le VLAN 1.
</details>

---

# PARTIE 4 — Résolution du problème

## 4.1 Correction

**Problème :** Le port Fa0/1 (PC Admin) est dans le VLAN 1 au lieu du VLAN 99.

**Où :** Sur **SW-Core** (switch où le PC Admin est branché).

**Commandes de correction :**
```
SW-Core# configure terminal
SW-Core(config)# interface fastEthernet0/1
SW-Core(config-if)# switchport mode access
SW-Core(config-if)# switchport access vlan 99
SW-Core(config-if)# exit
SW-Core(config)# exit
```

---

## 4.2 Vérification après correction

**Sur SW-Core :**
```
SW-Core# show vlan brief
```
→ Le port Fa0/1 doit apparaître dans le VLAN 99.

**Depuis le PC Admin :**
```
ping 192.168.99.2
ping 192.168.99.3
```
Les deux pings doivent répondre.

---

## 4.3 Sauvegarde (ne pas oublier)

**Sur SW-Core :**
```
SW-Core# copy running-config startup-config
```

Sans cette sauvegarde, la correction sera perdue au prochain redémarrage.

---

## 4.4 À rendre (pour les étudiants)

1. **L’erreur** : décrire ce qui est mal configuré (port dans le mauvais VLAN)
2. **Sur quel appareil** : SW-Core
3. **Les commandes de correction**
4. **L’explication** : pourquoi le port en VLAN 1 empêche la communication avec les switches dont l’IP est sur le VLAN 99

---

## Checklist de vérification finale

- [ ] `show vlan brief` : le port Fa0/1 est dans le VLAN 99
- [ ] Depuis le PC Admin : `ping 192.168.99.2` et `ping 192.168.99.3` fonctionnent
- [ ] Sauvegarde effectuée : `copy running-config startup-config` sur SW-Core

---

## Connaissances mobilisées

| Session    | Notion                    | Exemple dans le scénario                    |
|------------|---------------------------|---------------------------------------------|
| **Session 1** | Commandes `show`          | `show vlan brief` pour diagnostiquer        |
| **Session 1** | Sauvegarde                | `copy run start` après correction           |
| **Session 2** | Attribution des ports aux VLANs (access) | Port PC Admin dans le mauvais VLAN |
| **Session 2** | Interface de management (SVI) | Les switches ont une IP sur le VLAN 99  |

---

*Bon dépannage !*
