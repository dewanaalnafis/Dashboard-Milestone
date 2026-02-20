// Global Variables
let currentMonth = 2; // Februari
let currentTab = 'rnd';

// Complete Milestone Data (All 12 Months)
const milestoneData = {
    rnd: [
        {
            category: 'Profitability RnD',
            label: 'Cost Efficiency yang Dihasilkan (Penurunan HPP)',
            months: {
                1: '0.85', 2: '0.85', 3: '0.85', 4: '0.85', 5: '0.85', 6: '0.85',
                7: '0.8', 8: '0.8', 9: '0.8', 10: '0.8', 11: '0.8', 12: '0.8'
            }
        },
        {
            category: 'Pembangunan Rumah',
            label: 'Riset Metode (Waktu)',
            months: {
                1: 'Trial Pemasangan Rumah 20 hari serta identifikasi masalah pemasangan & data time study',
                2: 'Improvement Trial Pemasangan Rumah menjadi 15 hari serta identifikasi masalah pemasangan & data time study',
                3: 'Penyusunan SOP & IK sekaligus Training & Handover Produk Precast dan pemasangan unit precast ke Swakelola'
            }
        },
        {
            category: 'Pembangunan Rumah',
            label: 'Riset Product (Quality)',
            months: {
                10: 'Spesifikasi Awal Produk Baja Ringan',
                11: 'Finalisasi Desain Prototype Produk Baja Ringan',
                12: 'Produksi & Evaluasi Produk Prototype Baja Ringan'
            }
        },
        {
            category: 'Pembangunan Infra',
            label: 'Riset Product (Quality)',
            months: {
                4: 'Riset Produk Beton Fase 1 - Benchmarking & Desain Produk dan Trial Lab',
                5: 'Riset Produk Beton Fase 1 - Trial Produksi',
                6: 'Riset Produk Beton Fase 1 - Trial Lapangan',
                7: 'Riset Produk Beton Fase 2 - Benchmarking & Desain Produk dan Trial Lab',
                8: 'Riset Produk Beton Fase 2 - Trial Produksi',
                9: 'Riset Produk Beton Fase 2 - Trial Lapangan'
            }
        }
    ],
    pabrikasi: [
        {
            category: 'Timeline OKR Pabrik',
            label: 'Alat Produksi',
            months: {
                3: 'Batching Plant',
                4: 'Launching\nStart Mass Production',
                6: 'Hoist 2',
                11: 'Mesin Produk Baja Ringan'
            }
        },
        {
            category: 'Timeline OKR Pabrik',
            label: 'Infrastruktur',
            months: {
                2: 'Hoist',
                3: '1. Warehouse\n2. Listrik\n3. Plumbing',
                6: 'Warehouse 2'
            }
        },
        {
            category: 'Timeline OKR Pabrik',
            label: 'SDM/Man Power',
            months: {
                2: 'Target:\nStaff Finance\nEstimator'
            }
        },
        {
            category: 'Operation Perspective',
            label: 'Struktur Rumah Precast - Target Produksi',
            months: {
                1: '55 unit', 2: '55 unit', 3: '55 unit',
                4: '750 unit', 5: '750 unit', 6: '750 unit',
                7: '750 unit', 8: '750 unit', 9: '750 unit',
                10: '750 unit', 11: '750 unit', 12: '750 unit'
            }
        },
        {
            category: 'Operation Perspective',
            label: 'Dinding Rumah - Target Produksi',
            months: {
                1: '55 unit', 2: '55 unit', 3: '55 unit',
                4: '155 unit', 5: '155 unit', 6: '155 unit',
                7: '185 unit', 8: '185 unit', 9: '185 unit',
                10: '195 unit', 11: '195 unit', 12: '195 unit'
            }
        },
        {
            category: 'Operation Perspective',
            label: 'Pagar Rumah - Target Produksi',
            months: {
                1: '450 set', 2: '450 set', 3: '450 set',
                4: '750 set', 5: '750 set', 6: '750 set',
                7: '750 set', 8: '750 set', 9: '750 set',
                10: '750 set', 11: '750 set', 12: '750 set'
            }
        },
        {
            category: 'Operation Perspective',
            label: 'N CULVERT - Target Produksi',
            months: {
                1: '1980', 2: '1980', 3: '1980',
                4: '2475', 5: '2475', 6: '2475',
                7: '2601', 8: '2601', 9: '2601',
                10: '2865', 11: '2865', 12: '2865'
            }
        },
        {
            category: 'Operation Perspective',
            label: 'DUICKER - Target Produksi',
            months: {
                1: '6000', 2: '6000', 3: '6000',
                4: '7500', 5: '7500', 6: '7500',
                7: '7881', 8: '7881', 9: '7881',
                10: '8682', 11: '8682', 12: '8682'
            }
        }
    ]
};

// OKR Data - Only Feb & March for now
const okrData = {
    rnd: {
        2: [ // Februari
            {
                id: 'rnd-feb-1',
                name: 'Improvement Trial Pemasangan Rumah 15 hari',
                month: 2,
                division: 'rnd',
                category: 'Pembangunan Rumah - Riset Metode',
                totalTasks: 6,
                doneTasks: 2,
                wbs: [
                    {
                        code: 'A',
                        name: 'Time Study & Analysis',
                        tasks: [
                            { 
                                name: 'Identifikasi bottleneck pemasangan 20 hari', 
                                pic: 'Ahmad Fauzi', 
                                status: 'done-ontime', 
                                progress: 100,
                                issue: '',
                                actionDone: 'Completed time study analysis and identified 3 major bottlenecks',
                                actionPlan: ''
                            },
                            { 
                                name: 'Analisa time study detail per aktivitas', 
                                pic: 'Siti Nurhaliza', 
                                status: 'done-ontime', 
                                progress: 100,
                                issue: '',
                                actionDone: 'Created detailed breakdown of installation activities with time requirements',
                                actionPlan: ''
                            }
                        ]
                    },
                    {
                        code: 'B',
                        name: 'Method Improvement',
                        tasks: [
                            { 
                                name: 'Design improvement method', 
                                pic: 'Budi Santoso', 
                                status: 'potential-late', 
                                progress: 70,
                                issue: 'Delay dalam approval design dari engineering team, waiting for final sign-off',
                                actionDone: 'Drafted 3 method improvement proposals, presented to team, collected feedback',
                                actionPlan: 'Follow up daily dengan engineering, escalate ke manager jika belum approved dalam 2 hari. Target approval: 25 Feb'
                            },
                            { 
                                name: 'Prepare tools & equipment optimasi', 
                                pic: 'Dewi Kartika', 
                                status: 'on-track', 
                                progress: 60,
                                issue: '',
                                actionDone: '',
                                actionPlan: ''
                            }
                        ]
                    },
                    {
                        code: 'C',
                        name: 'Trial Implementation',
                        tasks: [
                            { 
                                name: 'Trial instalasi dengan metode baru', 
                                pic: 'Eko Prasetyo', 
                                status: 'not-yet', 
                                progress: 0,
                                issue: '',
                                actionDone: '',
                                actionPlan: ''
                            },
                            { 
                                name: 'Validasi hasil 15 hari target', 
                                pic: 'Fika Rahmawati', 
                                status: 'not-yet', 
                                progress: 0,
                                issue: '',
                                actionDone: '',
                                actionPlan: ''
                            }
                        ]
                    }
                ]
            }
        ],
        3: [ // Maret
            {
                id: 'rnd-mar-1',
                name: 'Penyusunan SOP & Training Handover Produk Precast',
                month: 3,
                division: 'rnd',
                category: 'Pembangunan Rumah - Riset Metode',
                totalTasks: 6,
                doneTasks: 0,
                wbs: [
                    {
                        code: 'A',
                        name: 'SOP Documentation',
                        tasks: [
                            { 
                                name: 'Draft SOP pemasangan precast', 
                                pic: 'Gita Purnama', 
                                status: 'not-yet', 
                                progress: 0,
                                issue: '',
                                actionDone: '',
                                actionPlan: ''
                            },
                            { 
                                name: 'Review & approval SOP', 
                                pic: 'Hadi Kusuma', 
                                status: 'not-yet', 
                                progress: 0,
                                issue: '',
                                actionDone: '',
                                actionPlan: ''
                            }
                        ]
                    },
                    {
                        code: 'B',
                        name: 'Training Material Prep',
                        tasks: [
                            { 
                                name: 'Buat materi training', 
                                pic: 'Indra Gunawan', 
                                status: 'not-yet', 
                                progress: 0,
                                issue: '',
                                actionDone: '',
                                actionPlan: ''
                            },
                            { 
                                name: 'Prepare IK (Instruksi Kerja)', 
                                pic: 'Joko Widodo', 
                                status: 'not-yet', 
                                progress: 0,
                                issue: '',
                                actionDone: '',
                                actionPlan: ''
                            }
                        ]
                    },
                    {
                        code: 'C',
                        name: 'Training Execution',
                        tasks: [
                            { 
                                name: 'Training to Swakelola team', 
                                pic: 'Kartika Sari', 
                                status: 'not-yet', 
                                progress: 0,
                                issue: '',
                                actionDone: '',
                                actionPlan: ''
                            },
                            { 
                                name: 'Handover & evaluation', 
                                pic: 'Lina Marlina', 
                                status: 'not-yet', 
                                progress: 0,
                                issue: '',
                                actionDone: '',
                                actionPlan: ''
                            }
                        ]
                    }
                ]
            }
        ]
    },
    pabrikasi: {
        2: [ // Februari
            {
                id: 'pabrikasi-feb-1',
                name: 'Hoist Installation',
                month: 2,
                division: 'pabrikasi',
                category: 'Timeline OKR Pabrik - Infrastruktur',
                totalTasks: 6,
                doneTasks: 4,
                wbs: [
                    {
                        code: 'A',
                        name: 'Site Preparation',
                        tasks: [
                            { 
                                name: 'Survey lokasi hoist', 
                                pic: 'Mira Safitri', 
                                status: 'done-ontime', 
                                progress: 100,
                                issue: '',
                                actionDone: 'Site survey completed, layout approved by safety team',
                                actionPlan: ''
                            },
                            { 
                                name: 'Foundation preparation', 
                                pic: 'Nanda Pratama', 
                                status: 'done-ontime', 
                                progress: 100,
                                issue: '',
                                actionDone: 'Foundation work completed and cured properly',
                                actionPlan: ''
                            }
                        ]
                    },
                    {
                        code: 'B',
                        name: 'Equipment Installation',
                        tasks: [
                            { 
                                name: 'Hoist assembly', 
                                pic: 'Omar Abdullah', 
                                status: 'done-ontime', 
                                progress: 100,
                                issue: '',
                                actionDone: 'Hoist fully assembled and mounted securely',
                                actionPlan: ''
                            },
                            { 
                                name: 'Electrical connection', 
                                pic: 'Putri Wulandari', 
                                status: 'done-late', 
                                progress: 100,
                                issue: 'PLN connection delayed 3 days karena proses administrasi',
                                actionDone: 'Used temporary genset untuk testing, koordinasi dengan PLN setiap hari, akhirnya connected',
                                actionPlan: ''
                            }
                        ]
                    },
                    {
                        code: 'C',
                        name: 'Testing & Commissioning',
                        tasks: [
                            { 
                                name: 'Load testing', 
                                pic: 'Qori Ananda', 
                                status: 'on-track', 
                                progress: 75,
                                issue: '',
                                actionDone: '',
                                actionPlan: ''
                            },
                            { 
                                name: 'Safety certification', 
                                pic: 'Rian Saputra', 
                                status: 'on-track', 
                                progress: 60,
                                issue: '',
                                actionDone: '',
                                actionPlan: ''
                            }
                        ]
                    }
                ]
            },
            {
                id: 'pabrikasi-feb-2',
                name: 'SDM Recruitment - Staff Finance & Estimator',
                month: 2,
                division: 'pabrikasi',
                category: 'Timeline OKR Pabrik - SDM',
                totalTasks: 6,
                doneTasks: 3,
                wbs: [
                    {
                        code: 'A',
                        name: 'Job Posting & Screening',
                        tasks: [
                            { 
                                name: 'Post job opening', 
                                pic: 'Sari Indah', 
                                status: 'done-ontime', 
                                progress: 100,
                                issue: '',
                                actionDone: 'Posted on Jobstreet, LinkedIn, and internal referral',
                                actionPlan: ''
                            },
                            { 
                                name: 'CV screening', 
                                pic: 'Tono Sugiarto', 
                                status: 'done-ontime', 
                                progress: 100,
                                issue: '',
                                actionDone: 'Screened 47 CVs, shortlisted 12 candidates',
                                actionPlan: ''
                            }
                        ]
                    },
                    {
                        code: 'B',
                        name: 'Interview & Selection',
                        tasks: [
                            { 
                                name: 'Interview Staff Finance candidates', 
                                pic: 'Umar Hasan', 
                                status: 'done-late', 
                                progress: 100,
                                issue: 'Interview schedule conflict dengan manager, reschedule 2x karena urgent meeting',
                                actionDone: 'Finally completed all interviews, selected 2 final candidates',
                                actionPlan: ''
                            },
                            { 
                                name: 'Interview Estimator candidates', 
                                pic: 'Vina Melati', 
                                status: 'late', 
                                progress: 80,
                                issue: 'Top candidate declined offer, need to restart dengan candidate pool kedua. Lost 1 week.',
                                actionDone: 'Contacted backup candidates, 2 sudah confirm untuk interview ulang minggu ini',
                                actionPlan: 'Interview 2 backup candidates dalam 3 hari, offer letter siap. Target close: 28 Feb'
                            }
                        ]
                    },
                    {
                        code: 'C',
                        name: 'Onboarding',
                        tasks: [
                            { 
                                name: 'Prepare onboarding materials', 
                                pic: 'Wati Suryani', 
                                status: 'on-track', 
                                progress: 50,
                                issue: '',
                                actionDone: '',
                                actionPlan: ''
                            },
                            { 
                                name: 'Conduct onboarding session', 
                                pic: 'Yuda Pratama', 
                                status: 'not-yet', 
                                progress: 0,
                                issue: '',
                                actionDone: '',
                                actionPlan: ''
                            }
                        ]
                    }
                ]
            }
        ],
        3: [ // Maret
            {
                id: 'pabrikasi-mar-1',
                name: 'Batching Plant Setup',
                month: 3,
                division: 'pabrikasi',
                category: 'Timeline OKR Pabrik - Alat Produksi',
                totalTasks: 9,
                doneTasks: 0,
                wbs: [
                    {
                        code: 'A',
                        name: 'Foundation & Installation',
                        tasks: [
                            { name: 'Excavation & foundation work', pic: 'Zaki Maulana', status: 'not-yet', progress: 0, issue: '', actionDone: '', actionPlan: '' },
                            { name: 'Steel structure assembly', pic: 'Ani Yulianti', status: 'not-yet', progress: 0, issue: '', actionDone: '', actionPlan: '' },
                            { name: 'Equipment placement', pic: 'Bayu Aji', status: 'not-yet', progress: 0, issue: '', actionDone: '', actionPlan: '' }
                        ]
                    },
                    {
                        code: 'B',
                        name: 'Equipment Calibration',
                        tasks: [
                            { name: 'Mixer calibration', pic: 'Citra Dewi', status: 'not-yet', progress: 0, issue: '', actionDone: '', actionPlan: '' },
                            { name: 'Conveyor belt alignment', pic: 'Doni Hermawan', status: 'not-yet', progress: 0, issue: '', actionDone: '', actionPlan: '' },
                            { name: 'Sensor & control setup', pic: 'Elsa Permata', status: 'not-yet', progress: 0, issue: '', actionDone: '', actionPlan: '' }
                        ]
                    },
                    {
                        code: 'C',
                        name: 'Operational Testing',
                        tasks: [
                            { name: 'Dry run testing', pic: 'Farhan Ramadhan', status: 'not-yet', progress: 0, issue: '', actionDone: '', actionPlan: '' },
                            { name: 'Production trial batch', pic: 'Gina Lestari', status: 'not-yet', progress: 0, issue: '', actionDone: '', actionPlan: '' },
                            { name: 'Quality check & certification', pic: 'Hendra Wijaya', status: 'not-yet', progress: 0, issue: '', actionDone: '', actionPlan: '' }
                        ]
                    }
                ]
            },
            {
                id: 'pabrikasi-mar-2',
                name: 'Warehouse, Listrik & Plumbing',
                month: 3,
                division: 'pabrikasi',
                category: 'Timeline OKR Pabrik - Infrastruktur',
                totalTasks: 9,
                doneTasks: 0,
                wbs: [
                    {
                        code: 'A',
                        name: 'Warehouse Construction',
                        tasks: [
                            { name: 'Foundation & structure', pic: 'Irma Susilowati', status: 'not-yet', progress: 0, issue: '', actionDone: '', actionPlan: '' },
                            { name: 'Roofing & walls', pic: 'Jaya Kusuma', status: 'not-yet', progress: 0, issue: '', actionDone: '', actionPlan: '' },
                            { name: 'Flooring & finishing', pic: 'Kiki Amalia', status: 'not-yet', progress: 0, issue: '', actionDone: '', actionPlan: '' }
                        ]
                    },
                    {
                        code: 'B',
                        name: 'Electrical System',
                        tasks: [
                            { name: 'Main power installation', pic: 'Lukman Hakim', status: 'not-yet', progress: 0, issue: '', actionDone: '', actionPlan: '' },
                            { name: 'Lighting system', pic: 'Maya Anggraini', status: 'not-yet', progress: 0, issue: '', actionDone: '', actionPlan: '' },
                            { name: 'Backup generator setup', pic: 'Nina Karlina', status: 'not-yet', progress: 0, issue: '', actionDone: '', actionPlan: '' }
                        ]
                    },
                    {
                        code: 'C',
                        name: 'Plumbing System',
                        tasks: [
                            { name: 'Water supply piping', pic: 'Oscar Nugroho', status: 'not-yet', progress: 0, issue: '', actionDone: '', actionPlan: '' },
                            { name: 'Drainage system', pic: 'Prita Maharani', status: 'not-yet', progress: 0, issue: '', actionDone: '', actionPlan: '' },
                            { name: 'Fire hydrant installation', pic: 'Qomar Zaman', status: 'not-yet', progress: 0, issue: '', actionDone: '', actionPlan: '' }
                        ]
                    }
                ]
            }
        ]
    }
};
