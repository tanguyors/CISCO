
import sys
filepath = 'C:/Users/orsin/Desktop/CISCO/src/NetMasterClass.jsx'
s8path = 'C:/Users/orsin/Desktop/CISCO/src/_s8_content.txt'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

with open(s8path, 'r', encoding='utf-8') as f:
    s8 = f.read()

# 1. Replace line 10146 (closing } of session 7) with session 8 block
# The } is followed by ];
old = chr(10) + '  }' + chr(10) + '];' + chr(10) + chr(10) + '// --- THEORY PLAYER ---'
new_block = chr(10) + s8 + chr(10) + '];' + chr(10) + chr(10) + '// --- THEORY PLAYER ---'
if old in content:
    content = content.replace(old, new_block, 1)
    print('1. Session 8 inserted OK')
else:
    print('ERROR: Could not find insertion point for session 8')
    sys.exit(1)

# 2. Insert session8Commands after session6Commands
s8cmds = chr(10) + chr(10) + 'const session8Commands = [' + chr(10)
s8cmds += '  { command: "ip route", description: "Ajouter une route statique vers un reseau distant", syntax: "ip route [reseau] [masque] [next-hop IP]" },' + chr(10)
s8cmds += '  { command: "ip route 0.0.0.0 0.0.0.0", description: "Configurer une route par defaut (passerelle de dernier recours)", syntax: "ip route 0.0.0.0 0.0.0.0 [next-hop IP]" },' + chr(10)
s8cmds += '  { command: "no ip route", description: "Supprimer une route statique existante", syntax: "no ip route [reseau] [masque] [next-hop IP]" },' + chr(10)
s8cmds += '  { command: "show ip route", description: "Afficher la table de routage complete du routeur", syntax: "show ip route" },' + chr(10)
s8cmds += '  { command: "show ip route static", description: "Afficher uniquement les routes statiques (S)", syntax: "show ip route static" },' + chr(10)
s8cmds += '  { command: "show ip interface brief", description: "Verifier l etat et les adresses de toutes les interfaces", syntax: "show ip interface brief" },' + chr(10)
s8cmds += '  { command: "ping", description: "Tester la connectivite vers une adresse IP", syntax: "ping [adresse IP]" },' + chr(10)
s8cmds += '  { command: "traceroute", description: "Afficher le chemin emprunte par les paquets vers une destination", syntax: "traceroute [adresse IP]" },' + chr(10)
s8cmds += '];' + chr(10)

# Find end of session6Commands
marker = '  { command: "show snmp", description: "Afficher les statistiques SNMP (paquets'
if marker in content:
    idx = content.index(marker)
    # Find the next ]; after this
    idx2 = content.index('];', idx)
    insert_pos = idx2 + 2
    content = content[:insert_pos] + s8cmds + content[insert_pos:]
    print('2. session8Commands inserted OK')
else:
    print('WARNING: Could not find session6Commands end')

# 3. Update CommandsLearningList switch
old_switch = 'activeSessionId === 6 ? session6Commands :' + chr(10) + '                      []'
new_switch = 'activeSessionId === 6 ? session6Commands :' + chr(10) + '                      activeSessionId === 7 ? [] :' + chr(10) + '                      activeSessionId === 8 ? session8Commands :' + chr(10) + '                      []'
if old_switch in content:
    content = content.replace(old_switch, new_switch, 1)
    print('3. CommandsLearningList switch updated OK')
else:
    print('WARNING: Could not update CommandsLearningList switch')

# 4. Update weeks array
old_weeks = "sessions: [7],"
new_weeks = "sessions: [7, 8],"
if old_weeks in content:
    content = content.replace(old_weeks, new_weeks, 1)
    print('4. Weeks sessions updated OK')
else:
    print('WARNING: Could not update weeks sessions')

old_sub = 'subtitle: "Adressage IP, masques de sous-reseau, VLSM"'
new_sub = 'subtitle: "Adressage IP, masques, routage statique"'
if old_sub in content:
    content = content.replace(old_sub, new_sub, 1)
    print('4b. Weeks subtitle updated OK')
else:
    print('WARNING: Could not update weeks subtitle')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

lines = content.split(chr(10))
print(f'Final line count: {len(lines)}')
print('ALL DONE')
