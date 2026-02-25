# -*- coding: utf-8 -*-
# Complete Session 8 inserter
import sys

filepath = 'C:/Users/orsin/Desktop/CISCO/src/NetMasterClass.jsx'
s8path = 'C:/Users/orsin/Desktop/CISCO/src/_s8_content.txt'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

with open(s8path, 'r', encoding='utf-8') as f:
    s8 = f.read()

orig_len = len(content)
print(f'Original: {orig_len} chars')
print(f'S8 content: {len(s8)} chars')

# 1. Insert session 8 content
old_end = "  }" + chr(10) + "];" + chr(10) + chr(10) + "// --- THEORY PLAYER ---"
new_end = s8 + chr(10) + "];" + chr(10) + chr(10) + "// --- THEORY PLAYER ---"
assert old_end in content, "Cannot find insertion point for session 8!"
content = content.replace(old_end, new_end, 1)
print("1. Session 8 content inserted")

# 2. Insert session8Commands
s8cmds = chr(10) * 2 + "const session8Commands = [" + chr(10)
s8cmds += '  { command: "ip route", description: "Ajouter une route statique vers un reseau distant", syntax: "ip route [reseau] [masque] [next-hop IP]" },' + chr(10)
s8cmds += '  { command: "ip route 0.0.0.0 0.0.0.0", description: "Configurer une route par defaut", syntax: "ip route 0.0.0.0 0.0.0.0 [next-hop IP]" },' + chr(10)
s8cmds += '  { command: "no ip route", description: "Supprimer une route statique existante", syntax: "no ip route [reseau] [masque] [next-hop IP]" },' + chr(10)
s8cmds += '  { command: "show ip route", description: "Afficher la table de routage complete du routeur", syntax: "show ip route" },' + chr(10)
s8cmds += '  { command: "show ip route static", description: "Afficher uniquement les routes statiques (S)", syntax: "show ip route static" },' + chr(10)
s8cmds += '  { command: "show ip interface brief", description: "Verifier l etat et les adresses de toutes les interfaces", syntax: "show ip interface brief" },' + chr(10)
s8cmds += '  { command: "ping", description: "Tester la connectivite vers une adresse IP", syntax: "ping [adresse IP]" },' + chr(10)
s8cmds += '  { command: "traceroute", description: "Afficher le chemin emprunte par les paquets vers une destination", syntax: "traceroute [adresse IP]" },' + chr(10)
s8cmds += "];" + chr(10)

marker = 'show snmp", description: "Afficher les statistiques SNMP'
if marker in content:
    idx = content.index(marker)
    idx2 = content.index("];", idx)
    insert_pos = idx2 + 2
    content = content[:insert_pos] + s8cmds + content[insert_pos:]
    print("2. session8Commands inserted")
else:
    print("WARNING: Could not find session6Commands end")

# 3. CommandsLearningList switch
old_sw = "activeSessionId === 6 ? session6Commands :" + chr(10) + "                      []"
new_sw = "activeSessionId === 6 ? session6Commands :" + chr(10) + "                      activeSessionId === 7 ? [] :" + chr(10) + "                      activeSessionId === 8 ? session8Commands :" + chr(10) + "                      []"
if old_sw in content:
    content = content.replace(old_sw, new_sw, 1)
    print("3. CommandsLearningList updated")
else:
    print("WARNING: CommandsLearningList not found")

# 4. Weeks
content = content.replace("sessions: [7]", "sessions: [7, 8]", 1)
print("4a. Weeks sessions updated")

old_sub = "Adressage IP, masques de sous-réseau, VLSM"
new_sub = "Adressage IP, masques, routage statique"
if old_sub in content:
    content = content.replace(old_sub, new_sub, 1)
    print("4b. Weeks subtitle updated")
else:
    print("WARNING: Weeks subtitle not found")

# 5. viewMode
content = content.replace("| 'labs_s7'", "| 'labs_s7' | 'labs_s8'", 1)
print("5. viewMode updated")

# 6. LabsSection
content = content.replace("const isSession7 = sessionId === 7;", "const isSession7 = sessionId === 7;" + chr(10) + "  const isSession8 = sessionId === 8;", 1)
print("6a. isSession8 added")

content = content.replace("isSession7 ? 'Correction Lab Adressage'", "isSession8 ? 'Correction Lab Routage' : isSession7 ? 'Correction Lab Adressage'", 1)
print("6b. Correction button updated")

content = content.replace("isSession7 ? 'Consignes Lab Adressage IP & Masques'", "isSession8 ? 'Consignes Lab Routage Statique' : isSession7 ? 'Consignes Lab Adressage IP & Masques'", 1)
print("6c. Consignes header updated")

content = content.replace("(isSession4 || isSession5 || isSession6 || isSession7) && lab.solutionContent", "(isSession4 || isSession5 || isSession6 || isSession7 || isSession8) && lab.solutionContent", 1)
print("6d. Correction rendering updated")

# 7. Sidebar - add labs_s8 button
sidebar_old = "Lab Adressage & Masques</p>" + chr(10)
sidebar_old += '                      <p className="text-[9px] text-slate-500">NetSolutions — 3 services</p>' + chr(10)
sidebar_old += "                    </div>" + chr(10)
sidebar_old += "                  </button>" + chr(10)
sidebar_old += "                </div>" + chr(10)
sidebar_old += "              )}"

sidebar_new = "Lab Adressage & Masques</p>" + chr(10)
sidebar_new += '                      <p className="text-[9px] text-slate-500">NetSolutions — 3 services</p>' + chr(10)
sidebar_new += "                    </div>" + chr(10)
sidebar_new += "                  </button>" + chr(10)
sidebar_new += "                  <button" + chr(10)
sidebar_new += "                    onClick={() => {" + chr(10)
sidebar_new += "                      setViewMode(" + chr(39) + "labs_s8" + chr(39) + ");" + chr(10)
sidebar_new += "                      if (window.innerWidth < 1024) setSidebarOpen(false);" + chr(10)
sidebar_new += "                    }}" + chr(10)
sidebar_new += "                    className={" + chr(96) + "w-full p-2.5 rounded-lg flex items-center gap-2 transition-all border text-xs ${" + chr(96) + chr(10)
sidebar_new += "                      viewMode === " + chr(39) + "labs_s8" + chr(39) + chr(10)
sidebar_new += "                        ? " + chr(39) + "bg-purple-600/20 border-purple-500 text-purple-100" + chr(39) + chr(10)
sidebar_new += "                        : " + chr(39) + "bg-[#0e0920] border-white/10 hover:bg-[#1a1035] text-slate-400 hover:border-white/20" + chr(39) + chr(10)
sidebar_new += "                    }" + chr(96) + "}" + chr(10)
sidebar_new += "                  >" + chr(10)
sidebar_new += "                    <div className={" + chr(96) + "p-1.5 rounded ${viewMode === " + chr(39) + "labs_s8" + chr(39) + " ? " + chr(39) + "bg-purple-600 text-white" + chr(39) + " : " + chr(39) + "bg-[#1a1035]" + chr(39) + "}" + chr(96) + "}>" + chr(10)
sidebar_new += '                      <RouterIcon className="w-4 h-4" />' + chr(10)
sidebar_new += "                    </div>" + chr(10)
sidebar_new += '                    <div className="text-left flex-1">' + chr(10)
sidebar_new += '                      <p className="font-bold">Lab Routage Statique</p>' + chr(10)
sidebar_new += '                      <p className="text-[9px] text-slate-500">2 routeurs, 3 réseaux</p>' + chr(10)
sidebar_new += "                    </div>" + chr(10)
sidebar_new += "                  </button>" + chr(10)
sidebar_new += "                </div>" + chr(10)
sidebar_new += "              )}"

if sidebar_old in content:
    content = content.replace(sidebar_old, sidebar_new, 1)
    print("7. Sidebar labs_s8 button added")
else:
    print("WARNING: Sidebar pattern not found")

# 7b. Lab count
content = content.replace("1 lab disponible</p>", "2 labs disponibles</p>", 1)
print("7b. Lab count updated")

# 8. viewMode title
old_t = "? 'Lab Adressage IP & Masques'" + chr(10) + "                  : activeSession.title"
new_t = "? 'Lab Adressage IP & Masques'" + chr(10) + "                  : viewMode === 'labs_s8'" + chr(10) + "                  ? 'Lab Routage Statique'" + chr(10) + "                  : activeSession.title"
if old_t in content:
    content = content.replace(old_t, new_t, 1)
    print("8. viewMode title updated")
else:
    print("WARNING: viewMode title not found")

# 9. Rendering block
old_r = "sessionId={7}" + chr(10) + "            />" + chr(10) + "          </div>" + chr(10) + "          ) : ("
new_r = "sessionId={7}" + chr(10) + "            />" + chr(10) + "          </div>" + chr(10)
new_r += "          ) : viewMode === 'labs_s8' ? (" + chr(10)
new_r += "          <div className=" + chr(34) + "h-full min-h-[500px]" + chr(34) + ">" + chr(10)
new_r += "            <LabsSection" + chr(10)
new_r += "              lab={sessions[7].lab}" + chr(10)
new_r += "              sessionLabel=" + chr(34) + "Routage Statique" + chr(34) + chr(10)
new_r += "              sessionDescription=" + chr(34) + "Lab Routage Statique : configurez des routes statiques entre deux routeurs pour connecter deux LAN." + chr(34) + chr(10)
new_r += "              sessionId={8}" + chr(10)
new_r += "            />" + chr(10)
new_r += "          </div>" + chr(10)
new_r += "          ) : ("

if old_r in content:
    content = content.replace(old_r, new_r, 1)
    print("9. Rendering block added")
else:
    print("WARNING: Rendering pattern not found")

# Write result
with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

final_lines = content.count(chr(10)) + 1
print(f'Final: {len(content)} chars, {final_lines} lines, added {len(content)-orig_len} chars')
print("ALL DONE")
