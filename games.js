// Mini-jeux interactifs pour les LABs
const gamesData = {
    quiz: [
        {
            id: 1,
            module: 1,
            section: "Routage statique",
            title: "Quiz - Routage statique",
            questions: [
                {
                    question: "Quelle commande permet d'afficher la table de routage ?",
                    options: [
                        "show ip route",
                        "display routing table",
                        "list routes",
                        "show routes"
                    ],
                    correct: 0,
                    explanation: "La commande 'show ip route' affiche la table de routage d'un routeur Cisco."
                },
                {
                    question: "Quelle est la syntaxe correcte pour ajouter une route statique ?",
                    options: [
                        "ip route network mask next-hop",
                        "route add network mask gateway",
                        "static route network mask next-hop",
                        "add route network mask gateway"
                    ],
                    correct: 0,
                    explanation: "La syntaxe correcte est 'ip route [réseau] [masque] [next-hop]'."
                },
                {
                    question: "Quelle commande permet de tester la connectivité entre deux hôtes ?",
                    options: [
                        "ping",
                        "test",
                        "connect",
                        "check"
                    ],
                    correct: 0,
                    explanation: "La commande 'ping' permet de tester la connectivité réseau."
                }
            ]
        },
        {
            id: 2,
            module: 1,
            section: "Routage OSPF",
            title: "Quiz - Configuration OSPF",
            questions: [
                {
                    question: "Quelle commande permet d'entrer en mode configuration OSPF ?",
                    options: [
                        "router ospf [process-id]",
                        "ospf enable [process-id]",
                        "configure ospf [process-id]",
                        "ospf process [process-id]"
                    ],
                    correct: 0,
                    explanation: "La commande 'router ospf [process-id]' permet d'entrer en mode configuration OSPF."
                },
                {
                    question: "Quelle commande affiche les voisins OSPF ?",
                    options: [
                        "show ip ospf neighbor",
                        "display ospf neighbors",
                        "show ospf neighbors",
                        "list ospf neighbors"
                    ],
                    correct: 0,
                    explanation: "La commande 'show ip ospf neighbor' affiche les voisins OSPF."
                },
                {
                    question: "Qu'est-ce qu'un wildcard mask ?",
                    options: [
                        "Un masque inversé utilisé pour les réseaux OSPF",
                        "Un masque pour sécuriser les réseaux",
                        "Un masque de sous-réseau standard",
                        "Un masque pour les VLANs"
                    ],
                    correct: 0,
                    explanation: "Un wildcard mask est un masque inversé (bits à 0 = match, bits à 1 = ignore)."
                }
            ]
        },
        {
            id: 3,
            module: 2,
            section: "Introduction VLAN",
            title: "Quiz - Configuration VLAN",
            questions: [
                {
                    question: "Quelle commande permet de créer un VLAN ?",
                    options: [
                        "vlan [numéro]",
                        "create vlan [numéro]",
                        "new vlan [numéro]",
                        "add vlan [numéro]"
                    ],
                    correct: 0,
                    explanation: "La commande 'vlan [numéro]' permet de créer et configurer un VLAN."
                },
                {
                    question: "Quelle commande assigne un port à un VLAN en mode access ?",
                    options: [
                        "switchport access vlan [numéro]",
                        "vlan access [numéro]",
                        "port vlan [numéro]",
                        "assign vlan [numéro]"
                    ],
                    correct: 0,
                    explanation: "La commande 'switchport access vlan [numéro]' assigne un port au VLAN spécifié."
                },
                {
                    question: "Quel est le VLAN natif par défaut ?",
                    options: [
                        "VLAN 1",
                        "VLAN 0",
                        "VLAN 100",
                        "VLAN 4094"
                    ],
                    correct: 0,
                    explanation: "Le VLAN 1 est le VLAN natif par défaut sur les commutateurs Cisco."
                }
            ]
        },
        {
            id: 4,
            module: 2,
            section: "Introduction Trunk inter-vlan",
            title: "Quiz - Configuration Trunk",
            questions: [
                {
                    question: "Quelle commande configure un port en mode trunk ?",
                    options: [
                        "switchport mode trunk",
                        "port mode trunk",
                        "trunk enable",
                        "enable trunk"
                    ],
                    correct: 0,
                    explanation: "La commande 'switchport mode trunk' configure un port en mode trunk."
                },
                {
                    question: "Quel protocole est utilisé pour le tagging VLAN sur les trunks ?",
                    options: [
                        "802.1Q",
                        "ISL",
                        "VTP",
                        "DTP"
                    ],
                    correct: 0,
                    explanation: "Le protocole 802.1Q est le standard pour le tagging VLAN sur les trunks."
                },
                {
                    question: "Quelle commande affiche les informations sur les trunks ?",
                    options: [
                        "show interfaces trunk",
                        "display trunk info",
                        "show trunk status",
                        "list trunks"
                    ],
                    correct: 0,
                    explanation: "La commande 'show interfaces trunk' affiche les informations sur les ports trunk."
                }
            ]
        },
        {
            id: 5,
            module: 3,
            section: "SSH",
            title: "Quiz - Configuration SSH",
            questions: [
                {
                    question: "Quelle commande génère les clés RSA pour SSH ?",
                    options: [
                        "crypto key generate rsa",
                        "generate ssh keys",
                        "create rsa keys",
                        "ssh key generate"
                    ],
                    correct: 0,
                    explanation: "La commande 'crypto key generate rsa' génère les clés RSA nécessaires pour SSH."
                },
                {
                    question: "Quelle version de SSH est recommandée ?",
                    options: [
                        "SSH version 2",
                        "SSH version 1",
                        "SSH version 1.5",
                        "Toutes les versions"
                    ],
                    correct: 0,
                    explanation: "SSH version 2 est la version recommandée pour des raisons de sécurité."
                },
                {
                    question: "Quelle commande configure les lignes VTY pour accepter uniquement SSH ?",
                    options: [
                        "transport input ssh",
                        "allow ssh only",
                        "enable ssh",
                        "ssh input"
                    ],
                    correct: 0,
                    explanation: "La commande 'transport input ssh' configure les lignes VTY pour accepter uniquement SSH."
                }
            ]
        },
        {
            id: 6,
            module: 4,
            section: "Intro SPT",
            title: "Quiz - Spanning Tree Protocol",
            questions: [
                {
                    question: "Quel est l'objectif principal du STP ?",
                    options: [
                        "Empêcher les boucles dans un réseau commuté",
                        "Augmenter la vitesse du réseau",
                        "Sécuriser le réseau",
                        "Réduire la latence"
                    ],
                    correct: 0,
                    explanation: "STP (Spanning Tree Protocol) empêche les boucles dans un réseau commuté."
                },
                {
                    question: "Quel pont est élu comme Root Bridge dans STP ?",
                    options: [
                        "Le pont avec la plus petite Bridge ID",
                        "Le pont avec la plus grande Bridge ID",
                        "Le premier pont démarré",
                        "Le pont configuré manuellement"
                    ],
                    correct: 0,
                    explanation: "Le Root Bridge est le pont avec la plus petite Bridge ID (priorité + MAC)."
                },
                {
                    question: "Combien d'états de port existe-t-il dans STP classique ?",
                    options: [
                        "5 (Blocking, Listening, Learning, Forwarding, Disabled)",
                        "3 (Blocking, Learning, Forwarding)",
                        "4 (Listening, Learning, Forwarding, Disabled)",
                        "2 (Blocking, Forwarding)"
                    ],
                    correct: 0,
                    explanation: "STP classique a 5 états : Blocking, Listening, Learning, Forwarding, Disabled."
                }
            ]
        },
        {
            id: 7,
            module: 5,
            section: "Config etherchannel",
            title: "Quiz - Etherchannel",
            questions: [
                {
                    question: "Combien de liens physiques maximum peuvent être agrégés dans un Etherchannel ?",
                    options: [
                        "8",
                        "4",
                        "16",
                        "2"
                    ],
                    correct: 0,
                    explanation: "Un Etherchannel peut agréger jusqu'à 8 liens physiques."
                },
                {
                    question: "Quel protocole Cisco est utilisé pour négocier un Etherchannel ?",
                    options: [
                        "PAgP (Port Aggregation Protocol)",
                        "LACP",
                        "STP",
                        "DTP"
                    ],
                    correct: 0,
                    explanation: "PAgP (Port Aggregation Protocol) est le protocole propriétaire Cisco pour Etherchannel."
                },
                {
                    question: "Quelle commande affiche le résumé des Etherchannels ?",
                    options: [
                        "show etherchannel summary",
                        "display etherchannel",
                        "show port-channel",
                        "list etherchannel"
                    ],
                    correct: 0,
                    explanation: "La commande 'show etherchannel summary' affiche un résumé de tous les Etherchannels."
                }
            ]
        },
        {
            id: 8,
            module: 6,
            section: "DHCP - DNS",
            title: "Quiz - DHCP et DNS",
            questions: [
                {
                    question: "Quelle commande crée un pool DHCP sur un routeur Cisco ?",
                    options: [
                        "ip dhcp pool [nom]",
                        "dhcp pool create [nom]",
                        "create dhcp pool [nom]",
                        "dhcp pool [nom]"
                    ],
                    correct: 0,
                    explanation: "La commande 'ip dhcp pool [nom]' crée un pool DHCP."
                },
                {
                    question: "Quelle commande exclut des adresses du pool DHCP ?",
                    options: [
                        "ip dhcp excluded-address [début] [fin]",
                        "dhcp exclude [début] [fin]",
                        "exclude dhcp [début] [fin]",
                        "dhcp excluded [début] [fin]"
                    ],
                    correct: 0,
                    explanation: "La commande 'ip dhcp excluded-address' exclut des adresses du pool DHCP."
                },
                {
                    question: "Quelle commande configure le serveur DNS dans le pool DHCP ?",
                    options: [
                        "dns-server [adresse]",
                        "dns [adresse]",
                        "name-server [adresse]",
                        "server dns [adresse]"
                    ],
                    correct: 0,
                    explanation: "La commande 'dns-server [adresse]' configure le serveur DNS dans le pool DHCP."
                }
            ]
        }
    ],
    configuration: [
        {
            id: 1,
            module: 1,
            section: "Routage statique",
            title: "Configurateur - Route statique",
            description: "Complétez la commande pour ajouter une route statique",
            tasks: [
                {
                    instruction: "Ajoutez une route statique vers le réseau 192.168.10.0/24 via 10.0.0.1",
                    command: "ip route {network} {mask} {next-hop}",
                    solution: "ip route 192.168.10.0 255.255.255.0 10.0.0.1",
                    hints: [
                        "Le réseau est 192.168.10.0",
                        "Le masque pour /24 est 255.255.255.0",
                        "Le next-hop est 10.0.0.1"
                    ]
                },
                {
                    instruction: "Ajoutez une route par défaut via 192.168.1.1",
                    command: "ip route {network} {mask} {next-hop}",
                    solution: "ip route 0.0.0.0 0.0.0.0 192.168.1.1",
                    hints: [
                        "Une route par défaut utilise 0.0.0.0 0.0.0.0",
                        "Le next-hop est 192.168.1.1"
                    ]
                }
            ]
        },
        {
            id: 2,
            module: 2,
            section: "Introduction VLAN",
            title: "Configurateur - Création VLAN",
            description: "Configurez un nouveau VLAN",
            tasks: [
                {
                    instruction: "Créez le VLAN 10 avec le nom 'Vente'",
                    command: "vlan {id}\nname {name}",
                    solution: "vlan 10\nname Vente",
                    hints: [
                        "Utilisez 'vlan 10' pour créer le VLAN",
                        "Puis utilisez 'name Vente' pour le nommer"
                    ]
                },
                {
                    instruction: "Assignez le port FastEthernet0/1 au VLAN 10 en mode access",
                    command: "interface {interface}\nswitchport mode access\nswitchport access vlan {id}",
                    solution: "interface FastEthernet0/1\nswitchport mode access\nswitchport access vlan 10",
                    hints: [
                        "Entrez en mode interface avec 'interface FastEthernet0/1'",
                        "Configurez le mode access",
                        "Assignez au VLAN 10"
                    ]
                }
            ]
        },
        {
            id: 3,
            module: 4,
            section: "Configuration SPT",
            title: "Configurateur - STP",
            description: "Configurez le Spanning Tree Protocol",
            tasks: [
                {
                    instruction: "Définissez la priorité STP à 4096",
                    command: "spanning-tree priority {value}",
                    solution: "spanning-tree priority 4096",
                    hints: [
                        "La priorité doit être un multiple de 4096",
                        "Utilisez 'spanning-tree priority 4096'"
                    ]
                },
                {
                    instruction: "Activez PortFast sur l'interface FastEthernet0/2",
                    command: "interface {interface}\nspanning-tree portfast",
                    solution: "interface FastEthernet0/2\nspanning-tree portfast",
                    hints: [
                        "Entrez en mode interface",
                        "Activez PortFast avec 'spanning-tree portfast'"
                    ]
                }
            ]
        }
    ]
};

// Fonction pour obtenir les jeux d'un module et section
function getGamesForModuleSection(moduleId, sectionTitle) {
    const quizGames = gamesData.quiz.filter(game => 
        game.module === moduleId && game.section === sectionTitle
    );
    const configGames = gamesData.configuration.filter(game => 
        game.module === moduleId && game.section === sectionTitle
    );
    
    return {
        quiz: quizGames,
        configuration: configGames
    };
}

// Fonction pour obtenir tous les jeux d'un module
function getGamesForModule(moduleId) {
    const quizGames = gamesData.quiz.filter(game => game.module === moduleId);
    const configGames = gamesData.configuration.filter(game => game.module === moduleId);
    
    return {
        quiz: quizGames,
        configuration: configGames
    };
}
