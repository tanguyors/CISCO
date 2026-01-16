// Structure des modules de formation avec vidéos YouTube
const modulesData = [
    {
        id: 1,
        title: "Réseau - Routage",
        description: "Apprenez les bases des réseaux, le routage statique et OSPF",
        icon: "🌐",
        overview: "Ce module couvre les fondamentaux des réseaux informatiques, les concepts de routage statique et le protocole OSPF (Open Shortest Path First). Vous apprendrez à configurer et gérer des routes dans un réseau Cisco.",
        videos: [
            {
                id: "1",
                title: "Introduction aux réseaux informatiques",
                youtubeId: "3QhU9jd03a0",
                description: "Vidéo d'introduction complète sur les réseaux informatiques"
            },
            {
                id: "2",
                title: "Masques de sous-réseau expliqués",
                youtubeId: "z07HkkAbgPU",
                description: "Comprendre les masques de sous-réseau en profondeur"
            }
        ],
        sections: [
            {
                title: "Réseau",
                description: "Introduction aux concepts de base des réseaux et calcul des masques de sous-réseau",
                content: `
                    <h3>Concepts clés :</h3>
                    <ul>
                        <li><strong>Adressage IP</strong> : Comprendre les adresses IPv4 et leur structure</li>
                        <li><strong>Masques de sous-réseau</strong> : Calcul et utilisation des masques pour segmenter un réseau</li>
                        <li><strong>Classes d'adresses</strong> : Classes A, B, C et adressage CIDR</li>
                        <li><strong>Réseaux et sous-réseaux</strong> : Création et gestion de sous-réseaux</li>
                    </ul>
                    <h3>Objectifs d'apprentissage :</h3>
                    <p>À la fin de cette section, vous serez capable de :</p>
                    <ul>
                        <li>Calculer les masques de sous-réseau appropriés</li>
                        <li>Identifier les adresses réseau et hôte</li>
                        <li>Planifier un schéma d'adressage IP</li>
                    </ul>
                `,
                videos: [
                    {
                        id: "1",
                        title: "Introduction aux réseaux - Cisco",
                        youtubeId: "3QhU9jd03a0",
                        description: "Fondamentaux des réseaux informatiques"
                    }
                ],
                resources: [
                    {
                        name: "Introduction réseau",
                        type: "cours",
                        path: "Cours Cisco -/1 - Réseau - Routage/1. Réseau/1- Intoduction réseau.pdf"
                    },
                    {
                        name: "Masque sous réseaux",
                        type: "cours",
                        path: "Cours Cisco -/1 - Réseau - Routage/1. Réseau/1 - Masque sous réseaux.pdf"
                    }
                ]
            },
            {
                title: "Routage statique",
                description: "Configuration et gestion du routage statique sur les routeurs Cisco",
                content: `
                    <h3>Concepts clés :</h3>
                    <ul>
                        <li><strong>Routage statique</strong> : Configuration manuelle des routes</li>
                        <li><strong>Route par défaut</strong> : Gateway par défaut et route 0.0.0.0/0</li>
                        <li><strong>Table de routage</strong> : Comprendre et analyser les tables de routage</li>
                        <li><strong>Résolution de problèmes</strong> : Commandes de diagnostic (show ip route, ping, traceroute)</li>
                    </ul>
                    <h3>Commandes essentielles :</h3>
                    <pre><code>ip route [réseau] [masque] [next-hop]
show ip route
ping [adresse]
traceroute [adresse]</code></pre>
                `,
                videos: [
                    {
                        id: "2",
                        title: "Routage statique - Configuration complète",
                        youtubeId: "Sa5XuO9H29s",
                        description: "Tutoriel complet sur le routage statique"
                    }
                ],
                resources: [
                    {
                        name: "Cours - Routage Statique",
                        type: "cours",
                        path: "Cours Cisco -/1 - Réseau - Routage/2. Routage statique/2- Routage_Statique.pdf"
                    },
                    {
                        name: "LAB routage",
                        type: "lab",
                        path: "Cours Cisco -/1 - Réseau - Routage/2. Routage statique/2 - LAB routage.pdf"
                    }
                ]
            },
            {
                title: "Routage OSPF",
                description: "Protocole de routage dynamique OSPF (Open Shortest Path First)",
                content: `
                    <h3>Concepts clés :</h3>
                    <ul>
                        <li><strong>OSPF</strong> : Protocole de routage à état de liens</li>
                        <li><strong>Areas OSPF</strong> : Hiérarchie et zones OSPF</li>
                        <li><strong>Wildcard masks</strong> : Utilisation des masques génériques</li>
                        <li><strong>DR/BDR</strong> : Designated Router et Backup Designated Router</li>
                        <li><strong>LSA</strong> : Link State Advertisements</li>
                    </ul>
                    <h3>Commandes OSPF :</h3>
                    <pre><code>router ospf [process-id]
network [réseau] [wildcard] area [area-id]
show ip ospf neighbor
show ip ospf database</code></pre>
                `,
                videos: [
                    {
                        id: "3",
                        title: "OSPF Configuration - Tutoriel complet",
                        youtubeId: "rUpadJ2QjfE",
                        description: "Configuration OSPF étape par étape"
                    },
                    {
                        id: "4",
                        title: "OSPF Multi-Area",
                        youtubeId: "qJj6jOaRjxE",
                        description: "Configuration OSPF avec plusieurs zones"
                    }
                ],
                resources: [
                    {
                        name: "Cours OSPF",
                        type: "cours",
                        path: "Cours Cisco -/1 - Réseau - Routage/3. Routage OSPF/3- Cours OSPF.pdf"
                    },
                    {
                        name: "LAB OSPF",
                        type: "lab",
                        path: "Cours Cisco -/1 - Réseau - Routage/3. Routage OSPF/3 - LAB OSPF.pdf"
                    },
                    {
                        name: "Cours wildmask",
                        type: "cours",
                        path: "Cours Cisco -/1 - Réseau - Routage/3. Routage OSPF/Cours wildmask.pdf"
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        title: "VLAN",
        description: "Maîtrisez les VLANs, les trunks et la sécurisation",
        icon: "🔌",
        overview: "Les VLANs (Virtual LANs) permettent de segmenter logiquement un réseau physique. Ce module vous apprendra à créer, configurer et sécuriser des VLANs sur les commutateurs Cisco.",
        videos: [
            {
                id: "1",
                title: "Introduction aux VLANs",
                youtubeId: "aE6B64I0u4E",
                description: "Comprendre les VLANs de A à Z"
            }
        ],
        sections: [
            {
                title: "Introduction VLAN",
                description: "Concepts de base des VLANs et configuration initiale",
                content: `
                    <h3>Concepts clés :</h3>
                    <ul>
                        <li><strong>VLAN</strong> : Réseau logique indépendant du réseau physique</li>
                        <li><strong>Ports d'accès</strong> : Ports assignés à un VLAN spécifique</li>
                        <li><strong>VLAN natif</strong> : VLAN par défaut (VLAN 1)</li>
                        <li><strong>VLANs standards</strong> : VLANs 1-1005</li>
                    </ul>
                    <h3>Commandes VLAN :</h3>
                    <pre><code>vlan [numéro]
name [nom]
interface [interface]
switchport mode access
switchport access vlan [numéro]</code></pre>
                `,
                videos: [
                    {
                        id: "1",
                        title: "VLAN Configuration - Débutant",
                        youtubeId: "aE6B64I0u4E",
                        description: "Configuration VLAN pour débutants"
                    }
                ],
                resources: [
                    {
                        name: "Cours - Introduction VLAN",
                        type: "cours",
                        path: "Cours Cisco -/2 - VLAN/Introduction Vlan/1 - Introduction VLAN.pdf"
                    },
                    {
                        name: "LAB - Introduction VLAN",
                        type: "lab",
                        path: "Cours Cisco -/2 - VLAN/Introduction Vlan/1 - Introduction VLAN - LAB.pdf"
                    },
                    {
                        name: "Corrigé - Introduction VLAN",
                        type: "corrige",
                        path: "Cours Cisco -/2 - VLAN/Introduction Vlan/1 - Introduction VLAN - Corrigé.pdf"
                    }
                ]
            },
            {
                title: "Introduction Trunk inter-vlan",
                description: "Configuration des trunks et routage inter-VLAN",
                content: `
                    <h3>Concepts clés :</h3>
                    <ul>
                        <li><strong>Trunk</strong> : Lien transportant plusieurs VLANs</li>
                        <li><strong>802.1Q</strong> : Protocole de tagging VLAN</li>
                        <li><strong>Routage inter-VLAN</strong> : Communication entre VLANs via routeur</li>
                        <li><strong>Router-on-a-stick</strong> : Configuration avec un seul lien physique</li>
                    </ul>
                    <h3>Configuration Trunk :</h3>
                    <pre><code>switchport mode trunk
switchport trunk allowed vlan [liste]
switchport trunk native vlan [numéro]
show interfaces trunk</code></pre>
                `,
                videos: [
                    {
                        id: "2",
                        title: "Trunk et Inter-VLAN Routing",
                        youtubeId: "aE6B64I0u4E",
                        description: "Configuration trunk et routage inter-VLAN"
                    }
                ],
                resources: [
                    {
                        name: "Cours - Trunk inter-vlan",
                        type: "cours",
                        path: "Cours Cisco -/2 - VLAN/Introduction Trunk inter-vlan/2 - Introduction Trunk inter vlan.pdf"
                    },
                    {
                        name: "LAB - Trunk inter-vlan",
                        type: "lab",
                        path: "Cours Cisco -/2 - VLAN/Introduction Trunk inter-vlan/2 - Introduction Trunk inter vlan - LAB.pdf"
                    },
                    {
                        name: "Corrigé - Trunk inter-vlan",
                        type: "corrige",
                        path: "Cours Cisco -/2 - VLAN/Introduction Trunk inter-vlan/2 - Introduction Trunk inter vlan - Corrigé.pdf"
                    }
                ]
            },
            {
                title: "Introduction Vlan avancés et sécurisation",
                description: "Techniques avancées de sécurisation des VLANs",
                content: `
                    <h3>Concepts clés :</h3>
                    <ul>
                        <li><strong>VLANs privés</strong> : Isolation au sein d'un VLAN</li>
                        <li><strong>VLANs sécurisés</strong> : Bonnes pratiques de sécurité</li>
                        <li><strong>VTP</strong> : VLAN Trunking Protocol (à éviter en production)</li>
                        <li><strong>DTP</strong> : Dynamic Trunking Protocol</li>
                    </ul>
                    <h3>Sécurisation :</h3>
                    <ul>
                        <li>Désactiver DTP : <code>switchport nonegotiate</code></li>
                        <li>Changer le VLAN natif</li>
                        <li>Restreindre les VLANs autorisés sur les trunks</li>
                    </ul>
                `,
                videos: [
                    {
                        id: "3",
                        title: "VLAN Sécurisation Avancée",
                        youtubeId: "aE6B64I0u4E",
                        description: "Techniques de sécurisation VLAN"
                    }
                ],
                resources: [
                    {
                        name: "Cours - Vlan avancés et sécurisation",
                        type: "cours",
                        path: "Cours Cisco -/2 - VLAN/Introduction Vlan avancés et sécurisation/3 - Introduction Vlan avancés et sécurisation.pdf"
                    },
                    {
                        name: "LAB - Vlan avancés et sécurisation",
                        type: "lab",
                        path: "Cours Cisco -/2 - VLAN/Introduction Vlan avancés et sécurisation/3 - Introduction Vlan avancés et sécurisation - LAB.pdf"
                    },
                    {
                        name: "Corrigé - Vlan avancés et sécurisation",
                        type: "corrige",
                        path: "Cours Cisco -/2 - VLAN/Introduction Vlan avancés et sécurisation/3 - Introduction Vlan avancés et sécurisation - Corrigé.pdf"
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        title: "Administration Cisco - SSH",
        description: "Administration des équipements Cisco et configuration SSH",
        icon: "⚙️",
        overview: "Apprenez à administrer efficacement les équipements Cisco, configurer SSH pour un accès sécurisé, et utiliser les Access Control Lists pour sécuriser votre réseau.",
        videos: [
            {
                id: "1",
                title: "Administration Cisco IOS",
                youtubeId: "rUpadJ2QjfE",
                description: "Bases de l'administration Cisco"
            }
        ],
        sections: [
            {
                title: "Administration CISCO",
                description: "Fondamentaux de l'administration des équipements Cisco",
                content: `
                    <h3>Concepts clés :</h3>
                    <ul>
                        <li><strong>IOS</strong> : Internetwork Operating System de Cisco</li>
                        <li><strong>Modes CLI</strong> : User EXEC, Privileged EXEC, Global Configuration</li>
                        <li><strong>Commandes essentielles</strong> : show, configure, copy, reload</li>
                        <li><strong>Sauvegarde</strong> : Configuration et restauration</li>
                    </ul>
                    <h3>Commandes de base :</h3>
                    <pre><code>enable
configure terminal
show running-config
copy running-config startup-config
reload</code></pre>
                `,
                videos: [
                    {
                        id: "1",
                        title: "Cisco IOS - Commandes de base",
                        youtubeId: "rUpadJ2QjfE",
                        description: "Introduction à l'administration Cisco"
                    }
                ],
                resources: [
                    {
                        name: "Cours théorique S1",
                        type: "cours",
                        path: "Cours Cisco -/3 - Administration Cisco - SSH/1 - Administration CISCO/2 - Cours theorique S1.pdf"
                    },
                    {
                        name: "LAB S1 - Administration Cisco",
                        type: "lab",
                        path: "Cours Cisco -/3 - Administration Cisco - SSH/1 - Administration CISCO/2- LAB S1 - Administration Cisco.pdf"
                    },
                    {
                        name: "Corrigé - Cours théorique S1",
                        type: "corrige",
                        path: "Cours Cisco -/3 - Administration Cisco - SSH/1 - Administration CISCO/2 - Cours theorique S1 - corrigé.pdf"
                    }
                ]
            },
            {
                title: "SSH",
                description: "Configuration SSH pour un accès sécurisé",
                content: `
                    <h3>Concepts clés :</h3>
                    <ul>
                        <li><strong>SSH</strong> : Secure Shell pour accès distant sécurisé</li>
                        <li><strong>Génération de clés</strong> : RSA keys pour SSH</li>
                        <li><strong>Configuration VTY</strong> : Lignes virtuelles pour accès distant</li>
                        <li><strong>Authentification</strong> : Local ou via serveur AAA</li>
                    </ul>
                    <h3>Configuration SSH :</h3>
                    <pre><code>hostname [nom]
ip domain-name [domaine]
crypto key generate rsa
ip ssh version 2
line vty 0 4
  transport input ssh
  login local</code></pre>
                `,
                videos: [
                    {
                        id: "2",
                        title: "Configuration SSH sur Cisco",
                        youtubeId: "rUpadJ2QjfE",
                        description: "Tutoriel SSH complet"
                    }
                ],
                resources: [
                    {
                        name: "Cours théorique S2",
                        type: "cours",
                        path: "Cours Cisco -/3 - Administration Cisco - SSH/2 - SSH/2 - Cours theorique S2.pdf"
                    },
                    {
                        name: "LAB S2 - SSH",
                        type: "lab",
                        path: "Cours Cisco -/3 - Administration Cisco - SSH/2 - SSH/2- LAB S2 - SSH.pdf"
                    },
                    {
                        name: "Corrigé - Cours théorique S2",
                        type: "corrige",
                        path: "Cours Cisco -/3 - Administration Cisco - SSH/2 - SSH/2 - Cours theorique S2 - corrigé.pdf"
                    }
                ]
            },
            {
                title: "SSH - DNS - Access list",
                description: "SSH avancé, DNS et Access Control Lists",
                content: `
                    <h3>Concepts clés :</h3>
                    <ul>
                        <li><strong>Access Control Lists (ACL)</strong> : Filtrage du trafic</li>
                        <li><strong>ACL Standard</strong> : Filtrage par adresse source</li>
                        <li><strong>ACL Étendue</strong> : Filtrage par source, destination, protocole, port</li>
                        <li><strong>DNS</strong> : Configuration du résolveur DNS</li>
                    </ul>
                    <h3>Configuration ACL :</h3>
                    <pre><code>access-list [numéro] permit/deny [source] [wildcard]
access-list [numéro] permit/deny [protocole] [source] [destination] [eq port]
ip access-group [numéro] in/out
show access-lists</code></pre>
                `,
                videos: [
                    {
                        id: "3",
                        title: "Access Control Lists (ACL)",
                        youtubeId: "rUpadJ2QjfE",
                        description: "Configuration des ACLs"
                    }
                ],
                resources: [
                    {
                        name: "Cours théorique S3",
                        type: "cours",
                        path: "Cours Cisco -/3 - Administration Cisco - SSH/3 - SSH - DNS - Access list/3 - Cours theorique S3.pdf"
                    },
                    {
                        name: "Cours théorique - access-list",
                        type: "cours",
                        path: "Cours Cisco -/3 - Administration Cisco - SSH/3 - SSH - DNS - Access list/3 - Cours theorique - access-list -.pdf"
                    },
                    {
                        name: "LAB S3",
                        type: "lab",
                        path: "Cours Cisco -/3 - Administration Cisco - SSH/3 - SSH - DNS - Access list/3- LAB S3.pdf"
                    },
                    {
                        name: "Corrigé - Cours théorique S3 SSH DNS",
                        type: "corrige",
                        path: "Cours Cisco -/3 - Administration Cisco - SSH/3 - SSH - DNS - Access list/3 - Cours theorique S3 - SSH DNS corrigé.pdf"
                    }
                ]
            }
        ]
    },
    {
        id: 4,
        title: "STP",
        description: "Spanning Tree Protocol et ses variantes",
        icon: "🌳",
        overview: "Le Spanning Tree Protocol (STP) empêche les boucles dans un réseau commuté. Ce module couvre STP, RSTP, PVST+ et MST.",
        videos: [
            {
                id: "1",
                title: "STP - Spanning Tree Protocol",
                youtubeId: "aE6B64I0u4E",
                description: "Comprendre STP en profondeur"
            }
        ],
        sections: [
            {
                title: "Intro SPT",
                description: "Introduction au Spanning Tree Protocol",
                content: `
                    <h3>Concepts clés :</h3>
                    <ul>
                        <li><strong>Boucles réseau</strong> : Problème des boucles dans les réseaux commutés</li>
                        <li><strong>STP</strong> : Algorithme pour éviter les boucles</li>
                        <li><strong>Root Bridge</strong> : Pont racine (pont avec la plus petite Bridge ID)</li>
                        <li><strong>Ports</strong> : Root Port, Designated Port, Blocked Port</li>
                        <li><strong>BPDU</strong> : Bridge Protocol Data Units</li>
                    </ul>
                    <h3>États des ports STP :</h3>
                    <ul>
                        <li><strong>Blocking</strong> : Port bloqué (20s)</li>
                        <li><strong>Listening</strong> : Port en écoute (15s)</li>
                        <li><strong>Learning</strong> : Port en apprentissage (15s)</li>
                        <li><strong>Forwarding</strong> : Port actif</li>
                        <li><strong>Disabled</strong> : Port désactivé</li>
                    </ul>
                `,
                videos: [
                    {
                        id: "1",
                        title: "STP - Introduction complète",
                        youtubeId: "aE6B64I0u4E",
                        description: "Fondamentaux du Spanning Tree Protocol"
                    }
                ],
                resources: [
                    {
                        name: "Cours - Introduction SPT",
                        type: "cours",
                        path: "Cours Cisco -/4 - STP/1 . Intro SPT/1 - Introduction SPT.pdf"
                    },
                    {
                        name: "LAB - Introduction SPT",
                        type: "lab",
                        path: "Cours Cisco -/4 - STP/1 . Intro SPT/1 - Introduction SPT - LAB.pdf"
                    },
                    {
                        name: "Corrigé - Introduction SPT",
                        type: "corrige",
                        path: "Cours Cisco -/4 - STP/1 . Intro SPT/1 - Introduction SPT - Corrigé.pdf"
                    }
                ]
            },
            {
                title: "Configuration SPT",
                description: "Configuration et optimisation du Spanning Tree Protocol",
                content: `
                    <h3>Concepts clés :</h3>
                    <ul>
                        <li><strong>Bridge Priority</strong> : Priorité du pont (0-65535, par pas de 4096)</li>
                        <li><strong>Port Priority</strong> : Priorité des ports</li>
                        <li><strong>Root Guard</strong> : Protection du root bridge</li>
                        <li><strong>PortFast</strong> : Activation rapide pour ports d'accès</li>
                        <li><strong>BPDU Guard</strong> : Protection contre BPDU non autorisés</li>
                    </ul>
                    <h3>Commandes STP :</h3>
                    <pre><code>spanning-tree mode [pvst|rapid-pvst|mst]
spanning-tree priority [priorité]
spanning-tree portfast
spanning-tree bpduguard enable
show spanning-tree</code></pre>
                `,
                videos: [
                    {
                        id: "2",
                        title: "Configuration STP",
                        youtubeId: "aE6B64I0u4E",
                        description: "Configuration et optimisation STP"
                    }
                ],
                resources: [
                    {
                        name: "Cours - Configuration SPT",
                        type: "cours",
                        path: "Cours Cisco -/4 - STP/2 . conf SPT/2 - Configuration SPT.pdf"
                    },
                    {
                        name: "LAB - Configuration SPT",
                        type: "lab",
                        path: "Cours Cisco -/4 - STP/2 . conf SPT/2 - Configuration SPT - LAB.pdf"
                    },
                    {
                        name: "Corrigé - Configuration SPT",
                        type: "corrige",
                        path: "Cours Cisco -/4 - STP/2 . conf SPT/2 - Configuration SPT - corrigé.pdf"
                    }
                ]
            },
            {
                title: "Configuration RSPT",
                description: "Rapid Spanning Tree Protocol (RSTP)",
                content: `
                    <h3>Concepts clés :</h3>
                    <ul>
                        <li><strong>RSTP</strong> : Version rapide de STP (convergence < 1 seconde)</li>
                        <li><strong>Port Roles</strong> : Root, Designated, Alternate, Backup</li>
                        <li><strong>Port States</strong> : Discarding, Learning, Forwarding</li>
                        <li><strong>PVST+</strong> : Per-VLAN Spanning Tree Plus</li>
                        <li><strong>MST</strong> : Multiple Spanning Tree</li>
                    </ul>
                    <h3>Avantages RSTP :</h3>
                    <ul>
                        <li>Convergence beaucoup plus rapide</li>
                        <li>Meilleure utilisation de la bande passante</li>
                        <li>Support des liens point-à-point</li>
                    </ul>
                `,
                videos: [
                    {
                        id: "3",
                        title: "RSTP - Rapid Spanning Tree",
                        youtubeId: "aE6B64I0u4E",
                        description: "Configuration RSTP et PVST+"
                    }
                ],
                resources: [
                    {
                        name: "Cours - Configuration RSPT",
                        type: "cours",
                        path: "Cours Cisco -/4 - STP/3 . Conf RSPT/3 - configuration RSPT.pdf"
                    },
                    {
                        name: "LAB - Configuration RSPT",
                        type: "lab",
                        path: "Cours Cisco -/4 - STP/3 . Conf RSPT/3 - configuration RSPT - LAB.pdf"
                    },
                    {
                        name: "Corrigé - Configuration RSPT",
                        type: "corrige",
                        path: "Cours Cisco -/4 - STP/3 . Conf RSPT/3 - configuration RSPT - Corrigé.pdf"
                    }
                ]
            },
            {
                title: "Ressources supplémentaires",
                description: "Comparaisons et ressources avancées",
                content: `
                    <h3>Comparaison PVST+ vs MST :</h3>
                    <ul>
                        <li><strong>PVST+</strong> : Un arbre par VLAN, meilleur pour petits réseaux</li>
                        <li><strong>MST</strong> : Plusieurs VLANs par instance, meilleur pour grands réseaux</li>
                    </ul>
                `,
                videos: [],
                resources: [
                    {
                        name: "Différence PVST+ et MST",
                        type: "cours",
                        path: "Cours Cisco -/4 - STP/Différence PVST+ et MST.pdf"
                    }
                ]
            }
        ]
    },
    {
        id: 5,
        title: "Etherchannel",
        description: "Agrégation de liens et Etherchannel",
        icon: "🔗",
        overview: "Etherchannel permet d'agréger plusieurs liens physiques en un seul lien logique, augmentant la bande passante et la redondance.",
        videos: [
            {
                id: "1",
                title: "Etherchannel - Agrégation de liens",
                youtubeId: "aE6B64I0u4E",
                description: "Introduction à Etherchannel"
            }
        ],
        sections: [
            {
                title: "Rappel STP + intro etherchannel",
                description: "Rappel STP et introduction à Etherchannel",
                content: `
                    <h3>Concepts clés :</h3>
                    <ul>
                        <li><strong>Etherchannel</strong> : Agrégation de 2-8 liens physiques</li>
                        <li><strong>Bénéfices</strong> : Bande passante augmentée, redondance, charge balancing</li>
                        <li><strong>Protocoles</strong> : PAgP (Cisco), LACP (standard IEEE)</li>
                        <li><strong>Modes</strong> : On, PAgP desirable/auto, LACP active/passive</li>
                    </ul>
                    <h3>Avantages :</h3>
                    <ul>
                        <li>Bande passante agrégée (jusqu'à 8 Gbps avec 8x1Gbps)</li>
                        <li>Redondance automatique</li>
                        <li>STP voit un seul lien logique</li>
                    </ul>
                `,
                videos: [
                    {
                        id: "1",
                        title: "Etherchannel - Introduction",
                        youtubeId: "aE6B64I0u4E",
                        description: "Introduction à Etherchannel"
                    }
                ],
                resources: [
                    {
                        name: "Cours - Rappel STP introduction Etherchannel",
                        type: "cours",
                        path: "Cours Cisco -/5 - Etherchannel/1 - Rappel STP + intro etherchannel/1 - Rappel STP introduction Etherchannel.pdf"
                    },
                    {
                        name: "LAB",
                        type: "lab",
                        path: "Cours Cisco -/5 - Etherchannel/1 - Rappel STP + intro etherchannel/1 - LAB.pdf"
                    },
                    {
                        name: "Corrigé - Rappel STP introduction Etherchannel",
                        type: "corrige",
                        path: "Cours Cisco -/5 - Etherchannel/1 - Rappel STP + intro etherchannel/1 - Rappel STP introduction Etherchannel - corrigé.pdf"
                    }
                ]
            },
            {
                title: "Config etherchannel",
                description: "Configuration complète d'Etherchannel",
                content: `
                    <h3>Concepts clés :</h3>
                    <ul>
                        <li><strong>Configuration</strong> : Création du port-channel</li>
                        <li><strong>Compatibilité</strong> : Les deux extrémités doivent être compatibles</li>
                        <li><strong>Load balancing</strong> : Répartition de charge (src-dst-ip, src-dst-mac, etc.)</li>
                    </ul>
                    <h3>Commandes Etherchannel :</h3>
                    <pre><code>interface range [interfaces]
channel-group [numéro] mode [on|desirable|active]
interface port-channel [numéro]
switchport mode trunk
show etherchannel summary</code></pre>
                `,
                videos: [
                    {
                        id: "2",
                        title: "Configuration Etherchannel",
                        youtubeId: "aE6B64I0u4E",
                        description: "Configuration complète Etherchannel"
                    }
                ],
                resources: [
                    {
                        name: "Cours - Config etherchannel",
                        type: "cours",
                        path: "Cours Cisco -/5 - Etherchannel/2 - Config etherchannel/2 - Config etherchannel.pdf"
                    },
                    {
                        name: "LAB ETHERCHANNEL",
                        type: "lab",
                        path: "Cours Cisco -/5 - Etherchannel/2 - Config etherchannel/2 - LAB ETHERCHANNEL.pdf"
                    },
                    {
                        name: "Corrigé - Config etherchannel",
                        type: "corrige",
                        path: "Cours Cisco -/5 - Etherchannel/2 - Config etherchannel/2 - Config etherchannel - Corrigé.pdf"
                    }
                ]
            },
            {
                title: "Etherchannel analyse",
                description: "Analyse et dépannage d'Etherchannel",
                content: `
                    <h3>Concepts clés :</h3>
                    <ul>
                        <li><strong>Dépannage</strong> : Commandes de diagnostic</li>
                        <li><strong>Vérification</strong> : État des ports, protocole utilisé</li>
                        <li><strong>Problèmes courants</strong> : Incompatibilité de modes, configuration incorrecte</li>
                    </ul>
                    <h3>Commandes de diagnostic :</h3>
                    <pre><code>show etherchannel summary
show etherchannel port-channel
show interfaces port-channel [numéro]
show etherchannel detail</code></pre>
                `,
                videos: [
                    {
                        id: "3",
                        title: "Dépannage Etherchannel",
                        youtubeId: "aE6B64I0u4E",
                        description: "Analyse et résolution de problèmes"
                    }
                ],
                resources: [
                    {
                        name: "Cours - Etherchannel analyse",
                        type: "cours",
                        path: "Cours Cisco -/5 - Etherchannel/3 - Etherchannel analyse/3 - Etherchannel analyse.pdf"
                    },
                    {
                        name: "LAB - Etherchannel analyse",
                        type: "lab",
                        path: "Cours Cisco -/5 - Etherchannel/3 - Etherchannel analyse/3 - Etherchannel analyse - LAB.pdf"
                    },
                    {
                        name: "Corrigé - Etherchannel analyse",
                        type: "corrige",
                        path: "Cours Cisco -/5 - Etherchannel/3 - Etherchannel analyse/3 - Etherchannel analyse - corrigé.pdf"
                    }
                ]
            }
        ]
    },
    {
        id: 6,
        title: "DHCP, DNS, FTP, etc",
        description: "Services réseau : DHCP, DNS, FTP, HTTP, ARP, Syslog, SNMP",
        icon: "🌍",
        overview: "Ce module couvre les services réseau essentiels : DHCP pour l'attribution automatique d'adresses IP, DNS pour la résolution de noms, FTP/HTTP pour le transfert de fichiers, et les protocoles de gestion comme Syslog et SNMP.",
        videos: [
            {
                id: "1",
                title: "DHCP et DNS - Services réseau",
                youtubeId: "aE6B64I0u4E",
                description: "Configuration DHCP et DNS"
            }
        ],
        sections: [
            {
                title: "DHCP - DNS",
                description: "Configuration DHCP et DNS sur routeurs Cisco",
                content: `
                    <h3>Concepts clés :</h3>
                    <ul>
                        <li><strong>DHCP</strong> : Dynamic Host Configuration Protocol</li>
                        <li><strong>Pool DHCP</strong> : Plage d'adresses à distribuer</li>
                        <li><strong>DNS</strong> : Domain Name System</li>
                        <li><strong>Résolveur DNS</strong> : Configuration des serveurs DNS</li>
                    </ul>
                    <h3>Configuration DHCP :</h3>
                    <pre><code>ip dhcp pool [nom]
  network [réseau] [masque]
  default-router [gateway]
  dns-server [serveur-dns]
ip dhcp excluded-address [début] [fin]</code></pre>
                `,
                videos: [
                    {
                        id: "1",
                        title: "DHCP Configuration sur Cisco",
                        youtubeId: "aE6B64I0u4E",
                        description: "Configuration DHCP complète"
                    }
                ],
                resources: [
                    {
                        name: "Cours théorique séance 1",
                        type: "cours",
                        path: "Cours Cisco -/6 - DHCP,DNS,FTP,etc/1 - DHCP - DNS/1 - Cours théorique séance 1.pdf"
                    },
                    {
                        name: "LAB - cours theorique séance 1",
                        type: "lab",
                        path: "Cours Cisco -/6 - DHCP,DNS,FTP,etc/1 - DHCP - DNS/1 - cours theorique séance 1 - LAB.pdf"
                    },
                    {
                        name: "Corrigé - Cours théorique séance 1",
                        type: "corrige",
                        path: "Cours Cisco -/6 - DHCP,DNS,FTP,etc/1 - DHCP - DNS/1 - Cours théorique séance 1 - Corrigé.pdf"
                    }
                ]
            },
            {
                title: "FTP - HTTP - ARP",
                description: "Protocoles de transfert et ARP",
                content: `
                    <h3>Concepts clés :</h3>
                    <ul>
                        <li><strong>FTP</strong> : File Transfer Protocol (port 21)</li>
                        <li><strong>HTTP/HTTPS</strong> : HyperText Transfer Protocol (ports 80/443)</li>
                        <li><strong>ARP</strong> : Address Resolution Protocol</li>
                        <li><strong>Table ARP</strong> : Correspondance IP/MAC</li>
                    </ul>
                    <h3>Commandes utiles :</h3>
                    <pre><code>show arp
clear arp-cache
ip http server
ip ftp username [user]
ip ftp password [password]</code></pre>
                `,
                videos: [
                    {
                        id: "2",
                        title: "FTP, HTTP et ARP",
                        youtubeId: "aE6B64I0u4E",
                        description: "Protocoles de transfert et ARP"
                    }
                ],
                resources: [
                    {
                        name: "Cours théorique séance 2",
                        type: "cours",
                        path: "Cours Cisco -/6 - DHCP,DNS,FTP,etc/2 - FTP - HTTP - ARP/2 - Cours théorique séance 2.pdf"
                    },
                    {
                        name: "Cours théorique séance 2 - FTP",
                        type: "cours",
                        path: "Cours Cisco -/6 - DHCP,DNS,FTP,etc/2 - FTP - HTTP - ARP/2 - Cours théorique séance 2 - FTP.pdf"
                    },
                    {
                        name: "LAB - Cours théorique séance 2",
                        type: "lab",
                        path: "Cours Cisco -/6 - DHCP,DNS,FTP,etc/2 - FTP - HTTP - ARP/2 - Cours théorique séance 2 - LAB.pdf"
                    },
                    {
                        name: "Corrigé - Cours théorique séance 2",
                        type: "corrige",
                        path: "Cours Cisco -/6 - DHCP,DNS,FTP,etc/2 - FTP - HTTP - ARP/2 - Cours théorique séance 2 - Corrigé.pdf"
                    }
                ]
            },
            {
                title: "Syslog - SNMP",
                description: "Protocoles de gestion et monitoring",
                content: `
                    <h3>Concepts clés :</h3>
                    <ul>
                        <li><strong>Syslog</strong> : Système de journalisation (port 514 UDP)</li>
                        <li><strong>Niveaux de log</strong> : 0-7 (Emergency à Debugging)</li>
                        <li><strong>SNMP</strong> : Simple Network Management Protocol</li>
                        <li><strong>Communautés SNMP</strong> : Read-only et Read-Write</li>
                        <li><strong>MIB</strong> : Management Information Base</li>
                    </ul>
                    <h3>Configuration Syslog :</h3>
                    <pre><code>logging [adresse-serveur]
logging trap [niveau]
logging facility [facilité]
show logging</code></pre>
                    <h3>Configuration SNMP :</h3>
                    <pre><code>snmp-server community [nom] ro/rw
snmp-server location [localisation]
snmp-server contact [contact]
show snmp</code></pre>
                `,
                videos: [
                    {
                        id: "3",
                        title: "Syslog et SNMP",
                        youtubeId: "aE6B64I0u4E",
                        description: "Configuration Syslog et SNMP"
                    }
                ],
                resources: [
                    {
                        name: "Cours théorique séance 3 - syslog - SNMP",
                        type: "cours",
                        path: "Cours Cisco -/6 - DHCP,DNS,FTP,etc/3 - Syslog - SNMP/3 - Cours théorique séance 3 - syslog - SNMP.pdf"
                    },
                    {
                        name: "LAB - Cours théorique séance 3",
                        type: "lab",
                        path: "Cours Cisco -/6 - DHCP,DNS,FTP,etc/3 - Syslog - SNMP/3 - Cours théorique séance 3 - LAB.pdf"
                    }
                ]
            }
        ]
    }
];

// Fonction pour obtenir l'icône selon le type de ressource
function getResourceIcon(type) {
    const icons = {
        cours: "📖",
        lab: "🔧",
        corrige: "✅",
        video: "🎥"
    };
    return icons[type] || "📄";
}

// Fonction pour obtenir le label selon le type de ressource
function getResourceLabel(type) {
    const labels = {
        cours: "Cours",
        lab: "LAB",
        corrige: "Corrigé",
        video: "Vidéo"
    };
    return labels[type] || "Document";
}
