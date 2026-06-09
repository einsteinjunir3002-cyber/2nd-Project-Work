/* SMARTLEARN AI - APPLICATION REACTIVE ENGINE (COMPACTED) */
const SYSTEM_PERMANENT_CONFIG = {
  provider: 'groq',
  apiKey: 'YOUR_GROQ_API_KEY_HERE', // ⚠️ REPLACE THIS with your full Groq API key (starts with gsk_)!
  model: 'llama-3.1-8b-instant'
};
const D = {
  get: id => document.getElementById(id),
  val: (id, v) => { const el = document.getElementById(id); if (el) { if (v !== undefined) el.value = v; return el.value; } },
  html: (id, h) => { const el = document.getElementById(id); if (el) el.innerHTML = h; },
  show: (id, s = true) => { const el = document.getElementById(id); if (el) el.style.display = s ? (id.includes('modal') || id.includes('indicator') ? 'flex' : 'block') : 'none'; }
};
const appState = {
  theme: 'light', currentView: 'landing-shell', activeStudentTab: 'student-dashboard', activeLecturerTab: 'lecturer-dashboard',
  students: [
    { id: 'user_std_1', name: 'Kofi Mensah', email: 'stu@smartlearn.edu', courses: 'CS101, ENG201', attendance: 95, cgpa: 3.82, status: 'Good Stand' },
    { id: 'user_std_2', name: 'Efua Ampah', email: 'efua@smartlearn.edu', courses: 'CS101, BUA202', attendance: 88, cgpa: 3.10, status: 'Good Stand' },
    { id: 'user_std_3', name: 'Joseph Addo', email: 'joseph@smartlearn.edu', courses: 'CS101, MATH102', attendance: 65, cgpa: 1.95, status: 'Needs Help' }
  ],
  facultyContacts: [
    { name: 'Dr. Kwame Mensah', role: 'CS101 Coordinator', email: 'k.mensah@smartlearn.edu', status: 'Online', avatar: 'avatar_lecturer.jpg', room: 'RM 302', hours: 'Tuesdays 2:00 PM - 4:00 PM' },
    { name: 'Prof. Ama Serwaa', role: 'Calculus Lead', email: 'a.serwaa@smartlearn.edu', status: 'Online', avatar: 'avatar_lecturer.jpg', room: 'RM 412', hours: 'Mon/Wed 10:00 AM - 12:00 PM' },
    { name: 'Joseph Addo (TA)', role: 'CS & Software Eng TA', email: 'j.addo@smartlearn.edu', status: 'Online', avatar: 'avatar_student.jpg', room: 'ICT Lab B', hours: 'Fridays 3:00 PM - 5:00 PM' }
  ],
  facultyChats: {
    'k.mensah@smartlearn.edu': [{ sender: 'faculty', text: 'Hello Kofi! Welcome to CS101 consultation channel. How can I help you today?', timestamp: '2 hours ago' }],
    'a.serwaa@smartlearn.edu': [{ sender: 'faculty', text: 'Hi Kofi, regarding the Calculus problem set, limits and continuity are core. Let me know if you want to walk through the questions.', timestamp: '1 day ago' }],
    'j.addo@smartlearn.edu': [{ sender: 'faculty', text: 'Hey Kofi, I graded the latest UML assignment. Good job on classes! Let me know if you need help with sequences.', timestamp: '3 hours ago' }]
  }, activeFacultyEmail: 'k.mensah@smartlearn.edu',
  courses: [
    { id: 'CS101', title: 'Introduction to Computer Science & Coding', code: 'CS101', instructor: 'Dr. Kwame Mensah', avatar: 'avatar_lecturer.jpg', notesCount: 4, assignmentsCount: 2 },
    { id: 'MATH102', title: 'Calculus & Applied Mathematics', code: 'MATH102', instructor: 'Prof. Ama Serwaa', avatar: 'avatar_lecturer.jpg', notesCount: 3, assignmentsCount: 1 },
    { id: 'ENG201', title: 'Software Engineering & Architectures', code: 'ENG201', instructor: 'Mr. Emmanuel Osei', avatar: 'avatar_lecturer.jpg', notesCount: 5, assignmentsCount: 3 },
    { id: 'BUA202', title: 'Business Administration & Management', code: 'BUA202', instructor: 'Dr. Sophia Tetteh', avatar: 'avatar_lecturer.jpg', notesCount: 2, assignmentsCount: 1 }
  ],
  notes: [
    { id: 1, courseId: 'CS101', title: 'Lec 1: Fundamentals of Python & Control Structures.pdf', date: '2026-05-15', size: '2.4 MB' },
    { id: 2, courseId: 'CS101', title: 'Lec 2: Object Oriented Programming in Python.pdf', date: '2026-05-20', size: '3.1 MB' },
    { id: 3, courseId: 'MATH102', title: 'Lec 1: Derivatives and Rate of Changes.pdf', date: '2026-05-12', size: '1.8 MB' },
    { id: 4, courseId: 'ENG201', title: 'Lec 1: Intro to Agile Methodologies & Scrum.pdf', date: '2026-05-18', size: '4.2 MB' }
  ],
  assignments: [
    { id: 1, courseId: 'CS101', title: 'Assignment 1: Logic Gates & Basic Control Flows', deadline: '2026-05-28', totalPoints: 100, status: 'Pending' },
    { id: 2, courseId: 'ENG201', title: 'Assignment 2: Drawing UML Diagrams', deadline: '2026-06-02', totalPoints: 100, status: 'Submitted', grade: '95', feedback: 'Excellent layout of class diagrams!' },
    { id: 3, courseId: 'MATH102', title: 'Problem Set 1: Matrix Inversion & Linear Systems', deadline: '2026-05-30', totalPoints: 50, status: 'Pending' }
  ],
  submissions: [
    { id: 1, assignmentId: 2, studentName: 'Kofi Mensah', fileName: 'uml_diagrams_kofi.pdf', date: '2026-05-22', grade: '95', feedback: 'Excellent layout of class diagrams!' }
  ],
  forumThreads: [
    { id: 1, category: 'Computer Science', author: 'Kofi Mensah', avatar: 'avatar_student.jpg', title: 'Struggling with Recursion in Python - Need help!', body: 'Hi everyone, I am trying to understand the base case in recursive functions. My function keeps hitting infinite loops. Can anyone explain how to prevent stack overflow?', upvotes: 14, replies: [{ author: 'Mr. Emmanuel Osei', avatar: 'avatar_lecturer.jpg', role: 'Lecturer', body: 'Think of the base case as the exit door. You must structure your arguments so they get closer to that door on each step. Try writing down the inputs step-by-step.' }] },
    { id: 2, category: 'Business', author: 'Efua Ampah', avatar: 'avatar_student.jpg', title: 'Top Entrepreneurship models in Ghana', body: 'What are the main financial models local startups are using to raise capital in Accra? Would love some case studies.', upvotes: 8, replies: [] }
  ],
  notifications: [
    { id: 1, text: 'Lecturer graded assignment: Assignment 2 (Grade: 95/100)', date: '2 hours ago', unread: true },
    { id: 2, text: 'New notes uploaded: Intro to Agile Methodologies & Scrum', date: '1 day ago', unread: false }
  ],
  careersDb: {
    programming: { programs: ['Computer Science', 'Software Engineering', 'Cybersecurity'], universities: ['Ashesi University', 'KNUST', 'University of Ghana'], description: 'You have strong logic, problem solving and coding capabilities. You are built for building digital infrastructure.', demand: 'Critically High (92% employment rate)', salary: 'GH₵ 8,000 - GH₵ 20,000+ / mo', skills: ['Algorithms', 'Python/JS', 'Data Structures', 'Git'] },
    business: { programs: ['Business Administration', 'Finance & Accounting', 'Economics & Public Policy', 'Marketing & Sales'], universities: ['UPSA', 'University of Ghana', 'Central University'], description: 'You are highly business-oriented, structured, and an excellent planner and communicator.', demand: 'High (80% employment rate)', salary: 'GH₵ 6,000 - GH₵ 16,000 / mo', skills: ['Leadership', 'Financial Analysis', 'Excel Modeling', 'Pitching'] },
    datascience: { programs: ['Data Science', 'Statistics', 'Mathematics'], universities: ['KNUST', 'University of Ghana'], description: 'You are passionate about finding hidden patterns in large sets of numbers and building predictions.', demand: 'Extremely High (88% employment rate)', salary: 'GH₵ 9,000 - GH₵ 22,000 / mo', skills: ['Data Mining', 'SQL', 'R/Python', 'Machine Learning'] },
    engineering: { programs: ['Electrical & Electronic Engineering', 'Mechanical Engineering', 'Architecture & Design'], universities: ['KNUST', 'Ashesi University', 'University of Ghana'], description: 'You are passionate about physical hardware, electrical circuitry, system control, and machine logistics.', demand: 'High (85% employment rate)', salary: 'GH₵ 7,500 - GH₵ 20,000 / mo', skills: ['Circuit Analysis', 'CAD Modeling', 'Thermodynamics', 'Signal Processing'] },
    healthcare: { programs: ['Medicine & Surgery (MBChB)', 'Nursing & Allied Health', 'Pharmacy (PharmD)'], universities: ['University of Ghana', 'KNUST', 'UCC'], description: 'You are deeply caring, methodical, and excel in clinical treatment, biological sciences, and health administration.', demand: 'Extremely High (95% employment rate)', salary: 'GH₵ 5,000 - GH₵ 30,000 / mo', skills: ['Patient Care', 'Clinical Anatomy', 'Pharmacology', 'Ethics'] },
    law: { programs: ['Bachelor of Laws (LLB)', 'Political Science & Law'], universities: ['University of Ghana', 'KNUST', 'GIMPA'], description: 'You have outstanding writing, debate, research, and analysis skills. You seek to interpret legal frameworks and advocate for rights.', demand: 'High (82% employment rate)', salary: 'GH₵ 8,000 - GH₵ 25,000 / mo', skills: ['Litigation', 'Legal Research', 'Constitutional Law', 'Debating'] }
  },
  universities: [
    { id: "ug", name: "University of Ghana (UG)", ranking: 1, image: "picture/ug_campus.jpg", type: "Public", location: "Legon, Accra", established: 1948, academicsInfo: "Renowned for arts, sciences, medicine, law. Premier university in Ghana.", performanceReview: "Highly ranked in West Africa for research productivity and citation impact.", feesRange: "GH₵ 3,500 - GH₵ 7,500 / year", scholarshipsInfo: "UG Financial Aid, MasterCard Scholars, corporate bursaries.", programsOffered: ["Bachelor of Laws (LLB)", "BSc Computer Science", "Bachelor of Medicine", "BSc Business Admin"], admissionRequirements: "WASSCE: English, Maths, Science plus 3 electives with aggregate <= 24." },
    { id: "knust", name: "Kwame Nkrumah University of Science and Technology (KNUST)", ranking: 2, image: "picture/knust_campus.jpg", type: "Public", location: "Kumasi, Ashanti Region", established: 1951, academicsInfo: "Leading science and technology education. Strong engineering and pharmacy.", performanceReview: "Exceptional output in technical innovations and engineering patents.", feesRange: "GH₵ 3,800 - GH₵ 8,500 / year", scholarshipsInfo: "MasterCard Foundation, Vice-Chancellor's Fund, GETFund.", programsOffered: ["BSc Civil Engineering", "BSc Computer Engineering", "Doctor of Pharmacy"], admissionRequirements: "WASSCE: Credits in English, Core Maths, Integrated Science, and 3 Electives, aggregate <= 24." },
    { id: "ucc", name: "University of Cape Coast (UCC)", ranking: 3, image: "picture/ucc_campus.jpg", type: "Public", location: "Cape Coast, Central Region", established: 1962, academicsInfo: "Famous for teacher training, business, agriculture, medical education.", performanceReview: "Consistently ranked top for research influence and pedagogical training.", feesRange: "GH₵ 3,400 - GH₵ 7,200 / year", scholarshipsInfo: "UCC Support Office, district assembly grants, Kakum bursaries.", programsOffered: ["BEd Computer Science", "BSc Accounting and Finance", "Bachelor of Medicine"], admissionRequirements: "WASSCE: Credits in English, Core Maths, Science, 3 electives, aggregate <= 24." },
    { id: "uds", name: "University for Development Studies (UDS)", ranking: 4, image: "picture/uds_campus.jpg", type: "Public", location: "Tamale, Northern Region", established: 1992, academicsInfo: "Pioneered community field program. Specialized in health, agriculture, development.", performanceReview: "High community impact through student-led rural development audits.", feesRange: "GH₵ 2,800 - GH₵ 6,000 / year", scholarshipsInfo: "Northern Development Authority, WHO sponsorships, UDS aid.", programsOffered: ["Doctor of Medicine (MD)", "BSc Agriculture", "BSc Development Studies"], admissionRequirements: "WASSCE: Credits in English, Maths, Science, 3 electives, aggregate <= 24." },
    { id: "uew", name: "University of Education, Winneba (UEW)", ranking: 5, image: "picture/uew_campus.jpg", type: "Public", location: "Winneba, Central Region", established: 1992, academicsInfo: "Specialized in training teachers and education professionals in Ghana.", performanceReview: "Primary driver of national teacher training and educational research.", feesRange: "GH₵ 2,900 - GH₵ 5,500 / year", scholarshipsInfo: "GETFund, UEW bursaries, local teacher financial aids.", programsOffered: ["BEd Mathematics", "BEd English", "BSc IT Education"], admissionRequirements: "WASSCE: Passes in English, Maths, Science, plus 3 teaching electives." },
    { id: "gimpa", name: "Ghana Institute of Management and Public Administration (GIMPA)", ranking: 6, image: "picture/gimpa_campus.jpg", type: "Public", location: "Greenhill, Accra", established: 1961, academicsInfo: "Elite business school for public administration and corporate governance.", performanceReview: "Top executive school, popular with corporate managers and public leaders.", feesRange: "GH₵ 6,000 - GH₵ 12,000 / year", scholarshipsInfo: "GIMPA Executive Sponsorships, public service packages, merit bursaries.", programsOffered: ["Bachelor of Laws (LLB)", "BSc Business Admin", "BSc IT"], admissionRequirements: "WASSCE: Credits in English, Core Maths, plus 3 electives." },
    { id: "upsa", name: "University of Professional Studies, Accra (UPSA)", ranking: 7, image: "picture/upsa_campus.jpg", type: "Public", location: "Madina, Accra", established: 1965, academicsInfo: "Combines professional practice with marketing, accounting, business.", performanceReview: "Renowned for high professional exam pass rates (ACCA, CIM, ICAG).", feesRange: "GH₵ 3,200 - GH₵ 6,800 / year", scholarshipsInfo: "UPSA VC Endowment Fund, corporate sponsorships, union grants.", programsOffered: ["BSc Accounting", "BSc Marketing", "BSc Business Economics"], admissionRequirements: "WASSCE: 3 credit passes in core subjects plus 3 electives." },
    { id: "umat", name: "University of Mines and Technology (UMaT)", ranking: 8, image: "picture/umat_campus.jpg", type: "Public", location: "Tarkwa, Western Region", established: 2004, academicsInfo: "Specialized mining engineering and petroleum geology studies.", performanceReview: "World-class lab facilities and high placement rate in global mining firms.", feesRange: "GH₵ 3,900 - GH₵ 8,200 / year", scholarshipsInfo: "Ghana Chamber of Mines, corporate sponsorships, development aids.", programsOffered: ["BSc Mining Engineering", "BSc Geological Engineering", "BSc Petroleum Engineering"], admissionRequirements: "WASSCE: Credits in English, Maths, Physics, Chemistry, and Elective Maths." },
    { id: "uhas", name: "University of Health and Allied Sciences (UHAS)", ranking: 9, image: "picture/uhas_campus.jpg", type: "Public", location: "Ho, Volta Region", established: 2011, academicsInfo: "Dedicated exclusively to health professional training and medical research.", performanceReview: "Highly competitive entry and strong clinical training with teaching hospitals.", feesRange: "GH₵ 4,200 - GH₵ 9,000 / year", scholarshipsInfo: "Ministry of Health bursaries, Volta Region grants, UHAS endowments.", programsOffered: ["Medicine & Surgery", "Doctor of Pharmacy", "BSc General Nursing"], admissionRequirements: "WASSCE: Credits in English, Maths, Science, Biology, Chemistry, Physics, aggregate <= 15." },
    { id: "uenr", name: "University of Energy and Natural Resources (UENR)", ranking: 10, image: "picture/uenr_campus.jpg", type: "Public", location: "Sunyani, Bono Region", established: 2011, academicsInfo: "Focused on national energy solutions and natural resources management.", performanceReview: "Leader in renewable energy research and forestry tracking systems.", feesRange: "GH₵ 3,100 - GH₵ 6,900 / year", scholarshipsInfo: "UENR Energy Research, environmental NGO grants, Ministry scholarships.", programsOffered: ["BSc Renewable Energy", "BSc Natural Resources", "BSc Computer Science"], admissionRequirements: "WASSCE: Credits in English, Core Maths, Integrated Science, 3 electives." },
    { id: "central", name: "Central University", ranking: 11, image: "picture/central_campus.jpg", type: "Private", location: "Miotso, Greater Accra", established: 1998, academicsInfo: "Largest private university in Ghana, owned by ICGC.", performanceReview: "Strong industry links in banking and media, large modern campus.", feesRange: "GH₵ 7,500 - GH₵ 14,000 / year", scholarshipsInfo: "ICGC Educational Grants, Central aid, Chancellor's Scholarships.", programsOffered: ["Doctor of Pharmacy", "BSc Architecture", "BSc Computer Science"], admissionRequirements: "WASSCE: Credits in 6 subjects including Core Mathematics and English." },
    { id: "kstu", name: "Kumasi Technical University (KsTU)", ranking: 12, image: "picture/kstu_campus.jpg", type: "Public", location: "Kumasi, Ashanti Region", established: 1954, academicsInfo: "Leading vocational-technical education in the middle belt.", performanceReview: "Excellent output in solar energy courses and TVET competitions.", feesRange: "GH₵ 2,600 - GH₵ 5,000 / year", scholarshipsInfo: "KsTU Student Aid, MasterCard Foundation, GETFund allocations.", programsOffered: ["BTech Electrical Engineering", "BTech Building Technology", "BTech Computer Science"], admissionRequirements: "WASSCE: 6 credit passes including Maths and English." },
    { id: "pentecost", name: "Pentecost University", ranking: 13, image: "picture/pentecost_campus.jpg", type: "Private", location: "Sowutuom, Accra", established: 2003, academicsInfo: "Ethical leadership, business, health sciences, construction studies.", performanceReview: "Strong nurse licensing pass rates, international partnerships.", feesRange: "GH₵ 5,500 - GH₵ 9,500 / year", scholarshipsInfo: "Pentecost Church Fund, Work-Study, leadership merit grants.", programsOffered: ["BSc Nursing", "BSc Physician Assistant", "BSc Computer Science"], admissionRequirements: "WASSCE: Credits in English, Maths, Science, plus 3 electives." },
    { id: "atu", name: "Accra Technical University (ATU)", ranking: 14, image: "picture/atu_campus.jpg", type: "Public", location: "Barnes Road, Accra", established: 1949, academicsInfo: "Premier technical university in Ghana focusing on TVET.", performanceReview: "Pioneered industrial internships and practical engineering training.", feesRange: "GH₵ 2,500 - GH₵ 4,800 / year", scholarshipsInfo: "Government TVET grants, ATU Welfare loans, industrial sponsorships.", programsOffered: ["BTech Mechanical Engineering", "BTech Civil Engineering", "BTech Computer Science"], admissionRequirements: "WASSCE: 6 credit passes including English and Mathematics." },
    { id: "htu", name: "Ho Technical University (HTU)", ranking: 15, image: "picture/ho_campus.jpg", type: "Public", location: "Ho, Volta Region", established: 1968, academicsInfo: "Renowned for food science, hospitality, fashion, agricultural tech.", performanceReview: "Leader in hospitality education, running student training hotels.", feesRange: "GH₵ 2,200 - GH₵ 4,300 / year", scholarshipsInfo: "HTU Financial Aid Scheme, local tourism board grants.", programsOffered: ["BTech Hospitality", "BTech Agro-Enterprise", "BTech Fashion Design"], admissionRequirements: "WASSCE: 6 credit passes including English and Core Mathematics." },
    { id: "cug", name: "Catholic University of Ghana (CUG)", ranking: 16, image: "picture/catholic_campus.jpg", type: "Private", location: "Fiapre, Sunyani", established: 2003, academicsInfo: "Focuses on moral and academic nursing, health, business training.", performanceReview: "Recognized for high ethical standards in regional public hospitals.", feesRange: "GH₵ 5,400 - GH₵ 8,900 / year", scholarshipsInfo: "Catholic Secretariat Bursaries, CUG Needy Students Fund.", programsOffered: ["BSc Computer Science", "BSc Public Health", "BSc Business Admin"], admissionRequirements: "WASSCE: 6 credit passes including Core English and Core Mathematics." },
    { id: "ttu", name: "Takoradi Technical University (TTU)", ranking: 18, image: "picture/ttu_campus.jpg", type: "Public", location: "Takoradi, Western Region", established: 1954, academicsInfo: "Pioneers technical courses for petroleum and gas industries.", performanceReview: "Offshore drilling oil-hub placement partnerships.", feesRange: "GH₵ 2,500 - GH₵ 4,900 / year", scholarshipsInfo: "GASSUP Petroleum Scholarships, Takoradi Chamber grants.", programsOffered: ["BTech Petroleum Engineering", "BTech Mechanical Engineering", "BTech Electrical Technology"], admissionRequirements: "WASSCE: Credits in Maths, English, Science, and 3 electives." },
    { id: "pug", name: "Presbyterian University Ghana (PUG)", ranking: 21, image: "picture/pug_campus.jpg", type: "Private", location: "Abetifi-Kwahu, Eastern Region", established: 2003, academicsInfo: "Multi-campus Christian academic training and nursing studies.", performanceReview: "Highly disciplined and top-rated quality private university in Ghana.", feesRange: "GH₵ 5,800 - GH₵ 9,800 / year", scholarshipsInfo: "Presbyterian Church Scholarships, PUG student subsidies.", programsOffered: ["BSc Nursing", "BSc IT", "BSc Physician Assistantship"], admissionRequirements: "WASSCE: 6 credit passes including core English and Mathematics." },
    { id: "cctu", name: "Cape Coast Technical University (CCTU)", ranking: 22, image: "picture/cctu_campus.jpg", type: "Public", location: "Cape Coast, Central Region", established: 1984, academicsInfo: "Engineering, applied sciences, TVET, and renewable green energy.", performanceReview: "Resource center for vocational training in southern Ghana.", feesRange: "GH₵ 2,300 - GH₵ 4,600 / year", scholarshipsInfo: "Government TVET support, CCTU Student Aid, tourism grants.", programsOffered: ["BTech Renewable Energy", "BTech Civil Engineering", "BTech Hospitality Management"], admissionRequirements: "WASSCE: Credits in English, Mathematics, Science, 3 electives." },
    { id: "methodist", name: "Methodist University Ghana (MUG)", ranking: 25, image: "picture/methodist_campus.jpg", type: "Private", location: "Dansoman, Accra", established: 2000, academicsInfo: "Excellent psychology, business administration, and accounting.", performanceReview: "Serene campus environment and active corporate placements office.", feesRange: "GH₵ 5,200 - GH₵ 9,000 / year", scholarshipsInfo: "Methodist Church Fund, Work-Study, district welfare grants.", programsOffered: ["BSc Psychology", "BBA Accounting", "BSc Information Technology"], admissionRequirements: "WASSCE: Credits in English, Maths, Science/Social, 3 electives." },
    { id: "ashesi", name: "Ashesi University", ranking: 27, image: "picture/ashesi_campus.jpg", type: "Private", location: "Berekuso, Eastern Region", established: 2002, academicsInfo: "Strict honor code, liberal arts, leadership, tech, business.", performanceReview: "Global acclaim for student career placements and modern green campus.", feesRange: "GH₵ 48,000 / year", scholarshipsInfo: "100% need-based scholarships, Ashesi Foundation, MasterCard.", programsOffered: ["BSc Computer Science", "BSc MIS", "BSc Business Admin", "BSc Mechanical Eng"], admissionRequirements: "WASSCE: Credits in Maths, English, plus essays and interview." },
    { id: "anu", name: "All Nations University (ANU)", ranking: 28, image: "picture/anu_campus.jpg", type: "Private", location: "Koforidua, Eastern Region", established: 2002, academicsInfo: "Famous for satellite space science and tech engineering.", performanceReview: "Built and launched Ghana's first educational satellite.", feesRange: "GH₵ 6,000 - GH₵ 10,500 / year", scholarshipsInfo: "ANU Space Research Scholarship, leadership grants.", programsOffered: ["BSc Electronics & Comm Engineering", "BSc Computer Science", "BSc Nursing"], admissionRequirements: "WASSCE: 6 credits including English, Core Maths, and Science." },
    { id: "vvu", name: "Valley View University (VVU)", ranking: 33, image: "picture/vvu_campus.jpg", type: "Private", location: "Oyibi, Greater Accra", established: 1979, academicsInfo: "First chartered private university. Seventh-day Adventist ethics.", performanceReview: "Strong IT graduate foundation with high ethical industry standards.", feesRange: "GH₵ 6,500 - GH₵ 10,000 / year", scholarshipsInfo: "SDA Church grants, VVU Work-Study, academic scholarships.", programsOffered: ["BSc Computer Science", "BSc IT", "BSc Nursing"], admissionRequirements: "WASSCE: Credit passes in 3 core subjects and 3 electives." },
    { id: "regent", name: "Regent University College of Science and Technology", ranking: 37, image: "picture/regent_campus.jpg", type: "Private", location: "McCarthy Hill, Accra", established: 2003, academicsInfo: "ICT, telecom engineering, business banking studies in Accra.", performanceReview: "High placement rate in telecommunications and software banks.", feesRange: "GH₵ 5,500 - GH₵ 9,000 / year", scholarshipsInfo: "Regent Institutional Aid, corporate telecom bursaries.", programsOffered: ["BSc Computer Science", "BSc Telecom Engineering", "BBA Banking & Finance"], admissionRequirements: "WASSCE: Credits in English, Core Maths, Science/Physics, 3 electives." },
    { id: "ktu", name: "Koforidua Technical University (KTU)", ranking: 40, image: "picture/ktu_campus.jpg", type: "Public", location: "Koforidua, Eastern Region", established: 1997, academicsInfo: "Technical entrepreneurship, EV automotive prototypes, computer science.", performanceReview: "Gained national acclaim for building electric vehicle prototypes.", feesRange: "GH₵ 2,400 - GH₵ 4,500 / year", scholarshipsInfo: "KTU Financial Aid, local mining corporate bursaries.", programsOffered: ["BTech Computer Science", "BTech Biomedical Engineering", "BTech Automotive Engineering"], admissionRequirements: "WASSCE: Credits in English, Maths, Science, plus 3 electives." },
    { id: "lancaster", name: "Lancaster University Ghana", ranking: 42, image: "picture/lancaster_campus.jpg", type: "Private", location: "East Legon, Accra", established: 2013, academicsInfo: "UK-accredited university offering British degree standards locally.", performanceReview: "Excellent global curriculum and foreign exchange studies.", feesRange: "GH₵ 45,000 - GH₵ 60,000 / year", scholarshipsInfo: "Lancaster Global Scholarship, merit discounts, corporate aids.", programsOffered: ["BSc Computer Science", "Bachelor of Laws (LLB)", "BSc Business Studies"], admissionRequirements: "WASSCE/A-Levels: 6 credits in WASSCE or 3 B grades in A-levels." },
    { id: "bluecrest", name: "BlueCrest University College", ranking: 43, image: "picture/bluecrest_campus.jpg", type: "Private", location: "Kokomlemle, Accra", established: 1999, academicsInfo: "Tech-centric with professional certifications in IT and fashion.", performanceReview: "Recognized for practical IT training labs and annual fashion shows.", feesRange: "GH₵ 6,500 - GH₵ 12,000 / year", scholarshipsInfo: "BlueCrest Foundation, tech talent discount waivers.", programsOffered: ["BSc Information Technology", "BA Fashion Design", "BSc Software Engineering"], admissionRequirements: "WASSCE: Credit passes in English and Core Maths, plus 3 electives." },
    { id: "wisconsin", name: "Wisconsin International University College", ranking: 44, image: "picture/wisconsin_campus.jpg", type: "Private", location: "Agbogba, Accra", established: 2000, academicsInfo: "Multicultural nursing, law, security, business communications.", performanceReview: "Popular with international students. Features mock law courts.", feesRange: "GH₵ 6,200 - GH₵ 11,000 / year", scholarshipsInfo: "Wisconsin Institutional Aid, international student bursaries.", programsOffered: ["Bachelor of Laws (LLB)", "BSc Nursing", "BSc IT and Management"], admissionRequirements: "WASSCE: Credits in Maths, English, Science/Social, 3 electives." },
    { id: "academiccity", name: "Academic City University College", ranking: 45, image: "picture/academiccity_campus.jpg", type: "Private", location: "Haatso, Accra", established: 2017, academicsInfo: "Project-based learning, artificial intelligence, robotics, design.", performanceReview: "Equipped with advanced engineering maker-spaces, startup incubator.", feesRange: "GH₵ 25,000 - GH₵ 35,000 / year", scholarshipsInfo: "Academic City President's Scholarship, tuition waivers.", programsOffered: ["BSc Artificial Intelligence", "BSc Robotics Engineering", "BSc Computer Engineering"], admissionRequirements: "WASSCE: Credits in Core Maths, English, Science, 3 electives." },
    { id: "webster", name: "Webster University Ghana", ranking: 51, image: "picture/webster_campus.jpg", type: "Private", location: "East Legon, Accra", established: 2013, academicsInfo: "American-accredited university offering US degrees in Ghana.", performanceReview: "Diverse classrooms and study-abroad/exchange programs.", feesRange: "GH₵ 50,000 - GH₵ 70,000 / year", scholarshipsInfo: "Webster Legacy Scholarships, US federal aid (FAFSA).", programsOffered: ["BA International Relations", "BSc Business Admin", "BS Computer Science"], admissionRequirements: "WASSCE/SAT: Credits in English and Maths, plus SAT/ACT score." }
  ], selectedUniType: 'All', uniSearchQuery: '' };
const careerQuizQuestions = [
  { title: "1. What kind of academic tasks do you enjoy the most?", options: [
    { category: "programming", text: "Coding programs and designing database systems" },
    { category: "business", text: "Creating financial plans and managing school activities" },
    { category: "datascience", text: "Finding patterns in statistical math databases" },
    { category: "engineering", text: "Assembling hardware circuits and designing mechanical devices" },
    { category: "healthcare", text: "Diagnosing biological symptoms and caregiving" },
    { category: "law", text: "Analyzing legal arguments, writing briefs, and debating rights" }
  ]},
  { title: "2. Which secondary school subject did you excel at the most?", options: [
    { category: "programming", text: "Information Technology & Elective Physics" },
    { category: "business", text: "Business Economics & Financial Accounting" },
    { category: "datascience", text: "Pure Mathematics & Probability" },
    { category: "engineering", text: "Applied Physics & Technical Drawing" },
    { category: "healthcare", text: "Chemistry & General Biology" },
    { category: "law", text: "Government, History & Literature in English" }
  ]},
  { title: "3. What would be your ideal post-graduate work environment?", options: [
    { category: "programming", text: "Leading tech developers in a software engineering hub" },
    { category: "business", text: "Managing finance portfolios in a banking office in Accra" },
    { category: "datascience", text: "Mining large databases to build predictive algorithms" },
    { category: "engineering", text: "Working in electrical grid facilities or robotics fabrication labs" },
    { category: "healthcare", text: "Working in clinical hospitals or pharmaceutical research facilities" },
    { category: "law", text: "Practicing in a law firm court room or policy consulting agency" }
  ]},
  { title: "4. Choose a final year project topic you would love to build:", options: [
    { category: "programming", text: "A multi-factor cybersecurity firewall system" },
    { category: "business", text: "A business model for online crop sales across Kumasi" },
    { category: "datascience", text: "A system that predicts student dropout risks from data" },
    { category: "engineering", text: "A solar-powered microgrid system for rural communities" },
    { category: "healthcare", text: "An automated drug compatibility analysis checklist" },
    { category: "law", text: "A legal advisory database covering Ghana land law precedents" }
  ]},
  { title: "5. Which critical skill do you want to master in college?", options: [
    { category: "programming", text: "Full-Stack coding and cloud engineering" },
    { category: "business", text: "Venture funding models and product pitching" },
    { category: "datascience", text: "Deep learning, SQL database query, and neural nets" },
    { category: "engineering", text: "CAD structural simulation and electric circuit layout" },
    { category: "healthcare", text: "Clinical patient assessment and medical diagnostics" },
    { category: "law", text: "Critical litigation arguments and constitutional reviews" } ]}
];
const programCardsData = [
  { title: 'BSc Computer Science', duration: '4 Years', bg: 'linear-gradient(135deg, var(--primary), var(--secondary))', desc: 'Study algorithms, software engineering, databases, network security, and machine learning structures.', careers: 'Software Engineer, Systems Architect, Devops', demand: 'High (92% placement rate)', salary: 'GH₵ 8,000 - GH₵ 22,000 / mo', suitability: 95 },
  { title: 'BSc Software Engineering', duration: '4 Years', bg: 'linear-gradient(135deg, var(--secondary), var(--accent))', desc: 'Learn standard development lifecycles, Scrum, design patterns, testing, and modern cloud deployment.', careers: 'Fullstack Developer, QA Lead, Project Manager', demand: 'Extremely High (90%)', salary: 'GH₵ 7,500 - GH₵ 18,000 / mo', suitability: 88 },
  { title: 'BSc Cybersecurity', duration: '4 Years', bg: 'linear-gradient(135deg, var(--primary), var(--accent))', desc: 'Focus on cryptography, vulnerability checks, secure coding, digital forensics, and firewall implementations.', careers: 'InfoSec Analyst, Ethical Hacker, Security Dev', demand: 'Critically High (94%)', salary: 'GH₵ 9,000 - GH₵ 25,000 / mo', suitability: 91 },
  { title: 'BSc Business Administration', duration: '4 Years', bg: 'linear-gradient(135deg, #1e3a8a, #0d9488)', desc: 'Master corporate leadership models, supply chain logistics, financial reporting, and product marketing.', careers: 'Product Manager, HR Director, Financial Advisor', demand: 'Moderate (75%)', salary: 'GH₵ 5,500 - GH₵ 14,000 / mo', suitability: 74 },
  { title: 'BSc Data Science', duration: '4 Years', bg: 'linear-gradient(135deg, #4f46e5, #0891b2)', desc: 'Study statistical data mining, machine learning models, database modeling, and predictive analytics.', careers: 'Data Scientist, Analytics Consultant, BI Developer', demand: 'Extremely High (88%)', salary: 'GH₵ 8,500 - GH₵ 22,000 / mo', suitability: 89 },
  { title: 'BSc Electrical Engineering', duration: '4 Years', bg: 'linear-gradient(135deg, #b45309, #d97706)', desc: 'Explore semiconductor circuits, microgrid layouts, power transmission, and electronic hardware control systems.', careers: 'Electrical Engineer, Power Specialist, Hardware Designer', demand: 'High (85%)', salary: 'GH₵ 7,000 - GH₵ 18,000 / mo', suitability: 86 },
  { title: 'Bachelor of Laws (LLB)', duration: '4 Years', bg: 'linear-gradient(135deg, #1e293b, #475569)', desc: 'Study constitutional law, jurisprudence, contract law, litigation processes, and legal drafting.', careers: 'Lawyer, Legal Counsel, Policy Advisor', demand: 'High (82%)', salary: 'GH₵ 8,000 - GH₵ 25,000 / mo', suitability: 80 },
  { title: 'BSc Nursing & Allied Health', duration: '4 Years', bg: 'linear-gradient(135deg, #059669, #10b981)', desc: 'Master clinical patient assessments, pediatric nursing care, anatomy, and pharmaceutical ethics.', careers: 'Clinical Nurse, Health Specialist, Ward Manager', demand: 'Extremely High (95%)', salary: 'GH₵ 5,000 - GH₵ 12,000 / mo', suitability: 92 },
  { title: 'BSc Mechanical Engineering', duration: '4 Years', bg: 'linear-gradient(135deg, #475569, #0f172a)', desc: 'Study machine thermodynamics, fluid mechanics, CAD structural design, robotics manufacturing, and mechanical control systems.', careers: 'Mechanical Engineer, Aerospace Systems Developer, Robotics Engineer', demand: 'High (83%)', salary: 'GH₵ 7,500 - GH₵ 19,000 / mo', suitability: 84 },
  { title: 'Medicine & Surgery (MBChB)', duration: '6 Years', bg: 'linear-gradient(135deg, #0d9488, #0f766e)', desc: 'Undergo intensive clinical rotations, diagnostics, pathology, internal medicine, surgery procedures, and public health policies.', careers: 'Medical Doctor, Surgeon, Healthcare Administrator', demand: 'Critically High (98%)', salary: 'GH₵ 9,500 - GH₵ 30,000 / mo', suitability: 95 },
  { title: 'Doctor of Pharmacy (PharmD)', duration: '6 Years', bg: 'linear-gradient(135deg, #0891b2, #083344)', desc: 'Master pharmaceutical chemistry, drug delivery systems, clinical pharmacology, pharmacotherapy, and community pharmacy management.', careers: 'Pharmacist, Clinical Research Lead, Drug Safety Director', demand: 'High (88%)', salary: 'GH₵ 6,000 - GH₵ 16,000 / mo', suitability: 87 },
  { title: 'BSc Architecture & Design', duration: '4 Years', bg: 'linear-gradient(135deg, #78350f, #451a03)', desc: 'Explore structural physics, sustainable spatial designs, CAD modeling, building codes, and environmental landscape engineering.', careers: 'Architect, Urban Planner, Construction Project Consultant', demand: 'High (80%)', salary: 'GH₵ 7,000 - GH₵ 20,000 / mo', suitability: 82 },
  { title: 'BA Economics & Public Policy', duration: '4 Years', bg: 'linear-gradient(135deg, #581c87, #3b0764)', desc: 'Analyze macroeconomic trends, public finance, econometrics, developmental policy frameworks, and market resource allocations.', careers: 'Policy Analyst, Economic Consultant, Research Director', demand: 'High (78%)', salary: 'GH₵ 6,000 - GH₵ 16,000 / mo', suitability: 76 }
];
/* ==========================================================================
   UI STATE ROUTER
   ========================================================================== */
function navigateTo(shellId) {
  D.get('landing-shell').classList.add('hidden'); D.get('portal-shell').classList.add('hidden'); D.get(shellId).classList.remove('hidden'); appState.currentView = shellId;
  if (shellId === 'portal-shell') { document.body.setAttribute('data-theme', appState.theme); updateSidebarDetails(); renderStateData(); }
  window.scrollTo(0,0); }
function switchTab(role, tabId) {
  if (role === 'lecturer' && appState.role !== 'lecturer' && appState.role !== 'admin') return showToastNotification('Access Denied: Lecturer role required.');
  if (role === 'student' && appState.role !== 'student' && appState.role !== 'admin') return showToastNotification('Access Denied: Student role required.'); const cls = role === 'student' ? 'student-view' : 'lecturer-view'; document.querySelectorAll('.' + cls).forEach(el => el.classList.remove('active')); const target = D.get(tabId); if (target) target.classList.add('active'); document.querySelectorAll('.sidebar-nav-item').forEach(el => el.classList.remove('active'));
  const btn = document.querySelector(`[data-tab="${tabId}"]`); if (btn) btn.classList.add('active');
  if (role === 'student') { appState.activeStudentTab = tabId; if (tabId === 'student-settings') prepopulateUserSettings('student'); }
  else { appState.activeLecturerTab = tabId; if (tabId === 'lecturer-settings') prepopulateUserSettings('lecturer'); }
  document.querySelector('aside.portal-sidebar')?.classList.remove('open'); }
/* ==========================================================================
   OFFLINE ENGINE
   ========================================================================== */
let isOfflineDemoMode = false;
const API_BASE = 'http://localhost:5000';
// Hardcoded demo accounts — always available regardless of localStorage state
const DEMO_ACCOUNTS = [
  { id: 'user_std_1', name: 'Kofi Mensah', email: 'stu@smartlearn.com', password: 'password', role: 'student', department: 'Computer Science', studentIdNumber: 'SL-20984' },
  { id: 'user_lec_1', name: 'Dr. Kwame Mensah', email: 'lec@smartlearn.com', password: 'password', role: 'lecturer', office: 'Block C, Rm 4' },
  { id: 'user_universal', name: 'Universal User', email: 'everybody@smartlearn.com', password: 'password', role: 'admin' }
];
const getSimulatedUsers = () => {
  try {
    const stored = localStorage.getItem('smartlearn_simulated_users');
    const parsed = stored ? JSON.parse(stored) : [];
    // Always merge: keep extra registered users, but guarantee demo accounts exist
    const merged = [...DEMO_ACCOUNTS];
    parsed.forEach(u => { if (!merged.find(d => d.email === u.email)) merged.push(u); });
    return merged;
  } catch(e) { return [...DEMO_ACCOUNTS]; }
}, saveSimulatedUsers = users => localStorage.setItem('smartlearn_simulated_users', JSON.stringify(users)),
loadOfflineState = () => {
  const s = localStorage.getItem('smartlearn_offline_appstate');
  if (s) { try { Object.assign(appState, JSON.parse(s)); } catch(e) {} }
}, saveOfflineState = () => {
  localStorage.setItem('smartlearn_offline_appstate', JSON.stringify({
    courses: appState.courses, notes: appState.notes, assignments: appState.assignments, submissions: appState.submissions, forumThreads: appState.forumThreads, universities: appState.universities, students: appState.students,
    facultyContacts: appState.facultyContacts, facultyChats: appState.facultyChats, activeFacultyEmail: appState.activeFacultyEmail
  }));
}, enableOfflineDemoIndicator = enable => { isOfflineDemoMode = enable; D.show('offline-demo-indicator', enable); }; if (!localStorage.getItem('smartlearn_offline_appstate')) saveOfflineState(); else loadOfflineState();
const openAuthModal = () => { D.show('auth-modal', true); D.show('auth-alert', false); switchAuthTab('signin'); }, closeAuthModal = () => D.show('auth-modal', false),
switchAuthTab = tab => {
  activeAuthTab = tab; D.show('auth-alert', false); const isSignIn = tab === 'signin'; D.get('auth-modal-title').textContent = isSignIn ? 'Sign In to SmartLearn' : 'Create Academic Account'; D.get('tab-signin-btn').style.background = isSignIn ? 'var(--primary)' : 'transparent'; D.get('tab-signin-btn').style.color = isSignIn ? 'white' : 'var(--text-muted)'; D.get('tab-signup-btn').style.background = isSignIn ? 'transparent' : 'var(--primary)'; D.get('tab-signup-btn').style.color = isSignIn ? 'var(--text-muted)' : 'white'; D.show('auth-signin-form', isSignIn); D.show('auth-signup-form', !isSignIn);
},
setSignupRole = role => {
  activeSignupRole = role;
  document.querySelectorAll('#auth-signup-form button[id^="role-"]').forEach(btn => {
    const act = btn.id === `role-${role}-btn`; btn.style.background = act ? 'rgba(124,58,237,0.1)' : 'transparent'; btn.style.border = act ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.08)'; btn.style.color = act ? 'var(--primary)' : 'var(--text-muted)';
  }); D.show('signup-student-fields', role === 'student'); D.show('signup-lecturer-fields', role === 'lecturer');
}, showAuthAlert = (msg, isSuccess = false) => {
  const el = D.get('auth-alert'); if (!el) return; el.style.display = 'block'; el.style.background = isSuccess ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)'; el.style.border = isSuccess ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(239,68,68,0.2)'; el.style.color = isSuccess ? '#10b981' : '#ef4444'; el.textContent = msg;
}; let activeAuthTab = 'signin', activeSignupRole = 'student';
async function handlePrototypeSignIn() {
  const email = D.val('signin-email'), password = D.val('signin-password');
  if (!email || !password) return showAuthAlert('Please fill in credentials.');
  try {
    const res = await fetch(`${API_BASE}/api/auth/signin`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
    const data = await res.json();
    if (res.ok && data.token) {
      // Real server responded successfully
      localStorage.setItem('proto_token', data.token); appState.user = data.user;
      enableOfflineDemoIndicator(false); showAuthAlert('Redirecting...', true);
      setTimeout(() => { closeAuthModal(); setUserRole(data.user.role); }, 1000);
      return;
    }
    // Server responded but rejected credentials — still try offline fallback below
  } catch (err) {
    // Network error (server offline) — try offline fallback below
  }
  // Offline / Demo fallback
  const user = getSimulatedUsers().find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem('proto_token', `simulated_token_${user.role}_${user.email}`);
    appState.user = user; enableOfflineDemoIndicator(true); showAuthAlert('Success (Offline Demo)!', true);
    setTimeout(() => { closeAuthModal(); setUserRole(user.role); }, 1000);
  } else {
    showAuthAlert('Invalid credentials.');
  }
}
async function handlePrototypeSignUp() {
  const name = D.val('signup-name'), email = D.val('signup-email'), password = D.val('signup-password'); if (!name || !email || !password) return showAuthAlert('Fill all general fields.');
  const payload = { name, email, password, role: activeSignupRole };
  if (activeSignupRole === 'student') {
    payload.department = D.val('signup-dept') || 'Computer Science';
    payload.studentIdNumber = D.val('signup-stdid') || `SL-${Math.floor(100000 + Math.random() * 900000)}`;
  } else if (activeSignupRole === 'lecturer') { payload.title = D.val('signup-title'); payload.office = D.val('signup-office') || 'Office Block C'; }
  try {
    const res = await fetch(`${API_BASE}/api/auth/signup`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); const data = await res.json(); if (!res.ok) return showAuthAlert(data.message || 'Signup failed.'); localStorage.setItem('proto_token', data.token); appState.user = data.user; enableOfflineDemoIndicator(false); showAuthAlert('Account created!', true);
    setTimeout(() => { closeAuthModal(); setUserRole(data.user.role); }, 1000);
  } catch (err) {
    const users = getSimulatedUsers(); if (users.some(u => u.email === email)) return showAuthAlert('Email already registered.');
    const newUser = { id: `user_sim_${Date.now()}`, name, email, password, role: activeSignupRole, ...payload }; users.push(newUser); saveSimulatedUsers(users);
    localStorage.setItem('proto_token', `simulated_token_${newUser.role}_${newUser.email}`); appState.user = newUser; enableOfflineDemoIndicator(true); showAuthAlert('Account created (Offline)!', true);
    setTimeout(() => { closeAuthModal(); setUserRole(newUser.role); }, 1000); } }
function setUserRole(role) {
  appState.role = role; navigateTo('portal-shell'); const switcher = D.get('portal-role-switcher-container');
  if (switcher) {
    switcher.innerHTML = role === 'admin' ? `
      <select style="padding:6px 12px; font-size:0.75rem; font-weight:700; border-radius:8px; background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.08); color:var(--primary); cursor:pointer;" onchange="setAdminPrototypeView(this.value)">
        <option value="student">🎓 View: Student Portal</option> <option value="lecturer">💼 View: Lecturer Desk</option>
      </select>` : ''; }
  if (role === 'admin') setAdminPrototypeView('student');
  else {
    document.querySelectorAll('.student-only').forEach(el => el.style.display = (role === 'student' ? 'flex' : 'none')); document.querySelectorAll('.lecturer-only').forEach(el => el.style.display = (role === 'lecturer' ? 'flex' : 'none')); switchTab(role, role === 'student' ? 'student-dashboard' : 'lecturer-dashboard'); }
  updateAiSettingsVisibility();
}
const setAdminPrototypeView = view => {
  const isStd = view === 'student'; document.querySelectorAll('.student-only').forEach(el => el.style.display = isStd ? 'flex' : 'none'); document.querySelectorAll('.lecturer-only').forEach(el => el.style.display = isStd ? 'none' : 'flex'); switchTab(view, isStd ? 'student-dashboard' : 'lecturer-dashboard');
},
handlePrototypeLogout = () => { localStorage.removeItem('proto_token'); appState.user = null; enableOfflineDemoIndicator(false); navigateTo('landing-shell'); };
async function validatePrototypeSession() {
  const token = localStorage.getItem('proto_token'); if (!token) return;
  if (token.startsWith('simulated_token_')) {
    const email = token.split('_')[3], user = getSimulatedUsers().find(u => u.email === email);
    if (user) { appState.user = user; setUserRole(user.role); enableOfflineDemoIndicator(true); }
    return; }
  try {
    const res = await fetch(`${API_BASE}/api/auth/session`, { headers: { 'Authorization': `Bearer ${token}` } });
    if (res.ok) { const data = await res.json(); appState.user = data.user; setUserRole(data.user.role); }
    else localStorage.removeItem('proto_token');
  } catch (err) {} }
window.addEventListener('DOMContentLoaded', validatePrototypeSession);
function updateSidebarDetails() {
  const avatarEl = D.get('sidebar-user-avatar'), nameEl = D.get('sidebar-user-name'), roleEl = D.get('sidebar-user-role'); if (!appState.user) return;
  nameEl.textContent = appState.user.username ? `@${appState.user.username}` : appState.user.name;
  if (appState.role === 'admin') {
    avatarEl.src = appState.user.avatar || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${appState.user.name}`; roleEl.textContent = 'Administrator Portal';
  } else if (appState.role === 'student') {
    avatarEl.src = appState.user.avatar || 'picture/avatar_student.jpg';
    roleEl.textContent = `${appState.user.department || 'Computer Science'} Student`;
  } else {
    avatarEl.src = appState.user.avatar || 'picture/avatar_lecturer.jpg';
    roleEl.textContent = `Faculty Member • ${appState.user.office || 'Block C'}`; } }
async function fetchStateData() {
  const token = localStorage.getItem('proto_token'); if (!token) return;
  if (token.startsWith('simulated_token_')) { loadOfflineState(); enableOfflineDemoIndicator(true); return; }
  try {
    const headers = { 'Authorization': `Bearer ${token}` }, getJSON = async url => { const r = await fetch(url, { headers }); return r.ok ? r.json() : null; };
    appState.courses = await getJSON(`${API_BASE}/api/courses`) || appState.courses;
    appState.notes = await getJSON(`${API_BASE}/api/courses/notes`) || appState.notes;
    appState.assignments = await getJSON(`${API_BASE}/api/assignments`) || appState.assignments;
    appState.forumThreads = await getJSON(`${API_BASE}/api/forums`) || appState.forumThreads;
    if (appState.role === 'lecturer' || appState.role === 'admin') appState.submissions = await getJSON(`${API_BASE}/api/assignments/submissions`) || appState.submissions;
    appState.universities = await getJSON(`${API_BASE}/api/universities`) || appState.universities; enableOfflineDemoIndicator(false);
  } catch (err) { loadOfflineState(); enableOfflineDemoIndicator(true); } }
const renderAllComponents = () => {
  renderStudentCourses(); renderStudentNotes(); renderStudentAssignments(); renderLecturerAnalytics(); renderLecturerSubmissions(); renderForums(); generateCalendarGrid(); renderDedicatedAssignmentsDeck(); renderStudentUniversities(); renderFacultyChat(); renderContactsDirectory(); renderProgramSelectionCards(); updateStudentDashboardMetrics();
},
updateStudentDashboardMetrics = () => {
  if (!appState.user || appState.role !== 'student') return; const s = appState.students.find(x => x.email.toLowerCase() === appState.user.email.toLowerCase());
  if (s) { D.html('student-cgpa-display', Number(s.cgpa).toFixed(2)); D.html('student-attendance-display', `${s.attendance}%`); } };
function renderFacultyChat() {
  const container = D.get('faculty-chat-contacts-list'); if (!container) return;
  container.innerHTML = appState.facultyContacts.map(c => {
    const active = appState.activeFacultyEmail === c.email;
    return `
      <div class="chat-contact-item glass" style="padding: 10px 14px; border-radius: var(--radius-sm); cursor: pointer; display: flex; align-items: center; gap: 10px; background: ${active ? 'rgba(37,99,235,0.15)' : 'rgba(0,0,0,0.15)'}; border: 1px solid ${active ? 'var(--primary)' : 'rgba(255,255,255,0.05)'};" onclick="switchFacultyContact('${c.email}')">
        <div class="instructor-avatar" style="width: 36px; height: 36px; border-radius: var(--radius-full); overflow: hidden; flex-shrink:0;"><img src="picture/${c.avatar}" style="width:100%; height:100%; object-fit:cover;"></div>
        <div style="flex: 1; min-width: 0;">
          <h4 style="font-size: 0.85rem; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #fff;">${c.name}</h4>
          <p style="font-size: 0.7rem; color: var(--text-muted); margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${c.role}</p>
        </div>
      </div>`;
  }).join(''); const activeContact = appState.facultyContacts.find(c => c.email === appState.activeFacultyEmail);
  if (activeContact) {
    D.get('active-chat-avatar').querySelector('img').src = `picture/${activeContact.avatar}`; D.html('active-chat-name', activeContact.name); D.html('active-chat-status', `🟢 Online (${activeContact.role})`);
    D.get('faculty-chat-input').placeholder = `Type a message to ${activeContact.name}...`; }
  const log = D.get('faculty-chat-log'); if (!log) return; const messages = appState.facultyChats[appState.activeFacultyEmail] || []; log.innerHTML = messages.length === 0 ? '<div style="text-align:center; color:var(--text-muted); font-size:0.8rem; padding: 20px;">No messages.</div>' :
    messages.map(msg => {
      const isStd = msg.sender === 'student';
      return `
        <div style="max-width: 75%; padding: 10px 14px; border-radius: 12px; font-size: 0.85rem; line-height: 1.45; align-self: ${isStd ? 'flex-end' : 'flex-start'}; background: ${isStd ? 'var(--primary)' : 'rgba(255,255,255,0.08)'}; color: ${isStd ? 'white' : 'var(--text-color)'};">
          <div>${msg.text}</div>
          <div style="font-size: 0.65rem; color: rgba(255,255,255,0.6); text-align: right; margin-top: 4px;">${msg.timestamp}</div>
        </div>`;
    }).join(''); log.scrollTop = log.scrollHeight; }
const switchFacultyContact = email => { appState.activeFacultyEmail = email; renderFacultyChat(); };
function sendFacultyChatMessage() {
  const input = D.get('faculty-chat-input'); if (!input || !input.value.trim()) return; const text = input.value.trim(); input.value = ''; if (!appState.facultyChats[appState.activeFacultyEmail]) appState.facultyChats[appState.activeFacultyEmail] = [];
  appState.facultyChats[appState.activeFacultyEmail].push({ sender: 'student', text: text, timestamp: 'Just now' }); saveOfflineState(); renderFacultyChat(); const name = appState.facultyContacts.find(c => c.email === appState.activeFacultyEmail)?.name || 'Professor';
  setTimeout(() => {
    const resText = getSimulatedFacultyResponse(name, text);
    appState.facultyChats[appState.activeFacultyEmail].push({ sender: 'faculty', text: resText, timestamp: 'Just now' }); saveOfflineState(); renderFacultyChat(); showToastNotification(`New message from ${name}`);
  }, 1200); }
function getSimulatedFacultyResponse(name, msg) {
  const text = msg.toLowerCase(); if (text.includes('hello') || text.includes('hi')) return 'Hello! Let me know what specific questions you have about our latest academic modules.'; if (text.includes('gpa') || text.includes('grade')) return 'Grades are computed based on coursework. Only lecturers can submit final adjustments.';
  if (text.includes('assignment') || text.includes('deadline')) return 'Ensure your file is uploaded through the Submission Center before the deadline tracker expires.'; return `Thanks for the details, Kofi. I will look into it and get back to you during office hours.`; }
async function renderStateData() { renderAllComponents(); try { await fetchStateData(); renderAllComponents(); } catch(e){} }
const renderStudentCourses = () => {
  const el = D.get('student-courses-grid'); if (el) el.innerHTML = appState.courses.map(c => `
    <div class="course-card">
      <div class="course-banner"><span class="course-code">${c.code}</span><h3 style="font-size:1.05rem; margin-top:10px;">${c.title}</h3></div>
      <div class="course-body">
        <p>Complete introduction course mapping foundations, tests, and research guides.</p>
        <div style="display:flex; justify-content:space-between; font-size:0.8rem; color:var(--text-muted);">
          <span>📚 ${c.notesCount} Lecture Notes</span><span>📝 ${c.assignmentsCount} Assignments</span>
        </div>
      </div>
      <div class="course-footer">
        <div class="instructor-profile"><div class="instructor-avatar"><img src="picture/${c.avatar}"></div><span>${c.instructor}</span></div>
        <button class="btn btn-secondary btn-sm" onclick="switchTab('student', 'student-contacts')">Contact</button>
      </div>
    </div>`).join('');
},
renderStudentNotes = () => {
  const el = D.get('student-notes-list'); if (el) el.innerHTML = appState.notes.map(note => {
    const code = appState.courses.find(c => c.id === note.courseId)?.code || 'GEN';
    return `
      <div class="glass" style="padding:16px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <span class="badge badge-primary" style="font-size:0.65rem; margin-bottom:4px;">${code}</span>
          <h4 style="font-size:0.95rem;">${note.title}</h4>
          <span style="font-size:0.75rem; color:var(--text-light)">Uploaded on ${note.date} • ${note.size}</span>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="btn btn-secondary btn-sm" onclick="simulateSummarizeNote('${note.title}')">AI Summarize</button>
          <a class="btn btn-primary btn-sm" href="#" download>Download</a>
        </div>
      </div>`;
  }).join('');
},
renderStudentAssignments = () => {
  const el = D.get('student-assignments-list'); if (el) el.innerHTML = appState.assignments.map(asg => {
    const code = appState.courses.find(c => c.id === asg.courseId)?.code || 'GEN';
    let act = asg.status === 'Pending' ? `<button class="btn btn-primary btn-sm" onclick="openSubmitAssignmentModal(${asg.id}, '${asg.title}')">Submit File</button>`
      : `<div style="text-align:right;"><span style="font-weight:700; color:var(--success)">Grade: ${asg.grade || 'Awaiting'}</span></div>`;
    return `
      <div class="glass" style="padding:20px; margin-bottom:16px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <span class="badge badge-info" style="font-size:0.65rem; margin-bottom:6px;">${code}</span>
          <h4 style="font-size:1.05rem; margin-bottom:4px;">${asg.title}</h4>
          <span style="font-size:0.8rem; color:var(--danger)">Deadline: ${asg.deadline}</span>
        </div>
        <div>${act}</div>
      </div>`;
  }).join(''); };
function renderLecturerAnalytics() {
  const el = D.get('lecturer-students-table-body'); if (!el) return; let total = 0;
  el.innerHTML = appState.students.map(s => {
    total += parseFloat(s.cgpa); const editing = appState.editingStudentId === s.id;
    const gpaCell = editing ? `<td><input type="number" step="0.01" value="${s.cgpa}" id="editing-gpa-val" style="width:70px;"></td>` : `<td><strong>${s.cgpa}</strong></td>`;
    const actionsCell = editing ? `<td><button class="btn btn-primary btn-sm" onclick="saveStudentGpa('${s.id}')">Save</button></td>` : `<td><button class="btn btn-secondary btn-sm" onclick="editStudentGpa('${s.id}')">Edit</button></td>`;
    return `
      <tr>
        <td><strong>${s.name}</strong></td><td>${s.courses}</td><td>${s.attendance}%</td>
        ${gpaCell}<td><span class="badge ${s.cgpa < 2 ? 'badge-danger' : 'badge-success'}">${s.status}</span></td>
        ${actionsCell}
      </tr>`;
  }).join(''); const avg = appState.students.length ? (total / appState.students.length).toFixed(2) : '0.00'; D.html('class-average-gpa-display', avg); }
const editStudentGpa = id => { appState.editingStudentId = id; renderLecturerAnalytics(); },
cancelEditStudentGpa = () => { appState.editingStudentId = null; renderLecturerAnalytics(); };
async function saveStudentGpa(id) {
  const gpa = parseFloat(D.val('editing-gpa-val')); if (isNaN(gpa) || gpa < 0 || gpa > 4) return showToastNotification('Enter a value between 0 and 4.'); const std = appState.students.find(s => s.id === id);
  if (std) {
    std.cgpa = gpa; std.status = gpa < 2 ? 'Needs Help' : 'Good Stand'; if (appState.user && appState.user.email.toLowerCase() === std.email.toLowerCase()) appState.user.cgpa = gpa; appState.editingStudentId = null; saveOfflineState(); showToastNotification('GPA updated!'); renderLecturerAnalytics(); const token = localStorage.getItem('proto_token');
    if (token && !token.startsWith('simulated_token_')) {
      try { await fetch(`${API_BASE}/api/students/update-gpa`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ studentId: id, cgpa: gpa }) }); } catch(e){} } } }
function renderLecturerSubmissions() {
  const el = D.get('lecturer-submissions-list'); if (!el) return;
  el.innerHTML = appState.submissions.map(sub => {
    const asg = appState.assignments.find(a => a.id === sub.assignmentId); const gradingHtml = sub.grade ? `<span style="color:var(--success); font-weight:700;">Graded: ${sub.grade}/100</span>` : `
      <div style="display:flex; gap:8px;">
        <input type="number" id="grade-val-${sub.id}" placeholder="Grade" style="width:70px;">
        <input type="text" id="feedback-val-${sub.id}" placeholder="Feedback" style="width:150px;">
        <button class="btn btn-primary btn-sm" onclick="submitGrade(${sub.id})">Grade</button>
      </div>`;
    return `
      <div class="glass" style="padding:20px; margin-bottom:16px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <h4>Student: <strong>${sub.studentName}</strong></h4>
          <span style="font-size:0.8rem;">File: <a href="#" style="color:var(--primary);">${sub.fileName}</a></span><br>
          <span style="font-weight:600;">Assignment: ${asg ? asg.title : 'General'}</span>
        </div>
        <div>${gradingHtml}</div>
      </div>`;
  }).join(''); }
async function submitGrade(id) {
  const grade = parseFloat(D.val(`grade-val-${id}`)), fb = D.val(`feedback-val-${id}`) || 'Well done.'; if (isNaN(grade)) return showToastNotification('Please enter a grade.'); const token = localStorage.getItem('proto_token'); if (!token) return;
  if (token.startsWith('simulated_token_') || isOfflineDemoMode) {
    const sub = appState.submissions.find(s => s.id == id);
    if (sub) {
      sub.grade = grade; sub.feedback = fb; const asg = appState.assignments.find(a => a.id == sub.assignmentId);
      if (asg) { asg.grade = grade.toString(); asg.feedback = fb; asg.status = 'Submitted'; }
      saveOfflineState(); showToastNotification('Graded (Offline)!'); renderStateData(); }
    return; }
  try {
    const res = await fetch(`${API_BASE}/api/assignments/grade`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ submissionId: id, grade, feedback: fb }) });
    if (res.ok) { showToastNotification('Graded successfully!'); renderStateData(); }
  } catch (err) {} }
function renderForums() {
  const el = D.get('forum-posts-container'); if (!el) return;
  el.innerHTML = appState.forumThreads.map(t => {
    const repliesHtml = t.replies.map(r => `
      <div style="background:var(--bg-base); padding:10px; margin-top:8px; border-left:3px solid var(--secondary);">
        <strong>${r.author}</strong> <span class="badge badge-info">${r.role}</span>
        <p style="font-size:0.85rem; margin-top:4px;">${r.body}</p>
      </div>`).join('');
    return `
      <div class="widget glass">
        <div class="forum-header"><strong>${t.author}</strong> <span class="badge badge-primary">${t.category}</span></div>
        <div class="forum-body" style="margin:12px 0;"><h4>${t.title}</h4><p>${t.body}</p></div>
        <div class="forum-actions">
          <button class="forum-action-btn" onclick="upvoteThread(${t.id})">👍 ${t.upvotes} Upvotes</button>
          <button class="forum-action-btn" onclick="toggleRepliesBox(${t.id})">💬 ${t.replies.length} Replies</button>
        </div>
        <div id="replies-box-${t.id}" style="margin-top:16px;">
          ${repliesHtml}
          <div style="display:flex; gap:8px; margin-top:12px;">
            <input type="text" id="reply-input-${t.id}" placeholder="Reply..." class="form-control">
            <button class="btn btn-secondary btn-sm" onclick="submitForumReply(${t.id})">Comment</button>
          </div>
        </div>
      </div>`;
  }).join(''); }
async function upvoteThread(id) {
  const token = localStorage.getItem('proto_token');
  if (token && token.startsWith('simulated_token_')) {
    const t = appState.forumThreads.find(x => x.id == id);
    if (t) { t.upvotes++; saveOfflineState(); renderStateData(); } return; }
  try { await fetch(`${API_BASE}/api/forums/upvote/${id}`, { method: 'PUT', headers: { 'Authorization': `Bearer ${token}` } }); renderStateData(); } catch(e){} }
const toggleRepliesBox = id => {
  const el = D.get(`replies-box-${id}`); if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none'; };
async function submitForumReply(id) {
  const input = D.get(`reply-input-${id}`); if (!input || !input.value.trim()) return; const token = localStorage.getItem('proto_token');
  if (token && token.startsWith('simulated_token_')) {
    const t = appState.forumThreads.find(x => x.id == id);
    if (t) {
      t.replies.push({ author: appState.user?.name || 'Student', avatar: 'avatar_student.jpg', role: 'Student', body: input.value }); input.value = ''; saveOfflineState(); renderStateData();
    } return; }
  try {
    const res = await fetch(`${API_BASE}/api/forums/reply`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ threadId: id, body: input.value }) });
    if (res.ok) { input.value = ''; renderStateData(); }
  } catch(e){} }
async function createForumThread() {
  const title = D.val('new-thread-title'), cat = D.val('new-thread-category'), body = D.val('new-thread-body'); if (!title || !body) return showToastNotification('Fill in title and description.'); const token = localStorage.getItem('proto_token');
  if (token && token.startsWith('simulated_token_')) {
    appState.forumThreads.unshift({ id: Date.now(), category: cat, author: appState.user?.name || 'Student', avatar: 'avatar_student.jpg', title, body, upvotes: 0, replies: [] }); D.val('new-thread-title', ''); D.val('new-thread-body', ''); saveOfflineState(); renderStateData(); return; }
  try {
    const res = await fetch(`${API_BASE}/api/forums/thread`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ category: cat, title, body }) });
    if (res.ok) { D.val('new-thread-title', ''); D.val('new-thread-body', ''); renderStateData(); }
  } catch(e){} }
let currentAiMode = 'study', chatSessionHistory = [];
const getSystemPrompt = mode => ({
  study: 'You are an intelligent, empathetic Academic Study Assistant at a Ghanaian university. Explain concepts clearly, suggest study strategies, and reference local Ghanaian context.', career: 'You are an expert Career and Academic Advisor for tertiary students in Ghana. Guide on matching majors, job opportunities in Accra/Kumasi, salaries, and skills.', helper: 'You are an academic writing counselor. Assist students with structuring essays and checking logic. Remind them to avoid plagiarism.',
  tutor: 'You are a Programming Tutor. Explain code, debug, and provide brief examples in Python, JS, SQL.'
}[mode] || 'Assistant');
function setAiMode(mode) {
  currentAiMode = mode; document.querySelectorAll('.ai-mode-btn').forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-mode') === mode)); chatSessionHistory = [];
  const greet = {
    study: 'Hello! I am your AI Study Assistant. Ask me to explain concepts or translate notes.', career: 'Welcome! I am your AI Career Advisor. Tell me your interests and let\'s explore careers.',
    helper: 'I am your Assignment Helper. Paste guidelines to get structural feedback.',
    tutor: 'Hey! I am your AI Programming Tutor. Paste your code and let\'s debug!'
  }[mode] || 'Hello!';
  chatSessionHistory.push({ role: 'assistant', content: greet }); D.html('ai-chat-messages', ''); appendChatMessage('ai', greet); }
function appendChatMessage(sender, text) {
  const box = D.get('ai-chat-messages'); if (!box) return; const bubble = document.createElement('div');
  bubble.className = `message-bubble ${sender === 'user' ? 'message-user' : 'message-ai'}`;
  bubble.innerHTML = text.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/```(python|js|sql)?([\s\S]*?)```/g, '<pre style="background:rgba(0,0,0,0.05); padding:10px; border-radius:6px; font-family:monospace; overflow-x:auto;">$2</pre>'); box.appendChild(bubble); box.scrollTop = box.scrollHeight; }
async function executeClientAiRequest(prompt, systemInstruction, mode = 'study') {
  const token = localStorage.getItem('proto_token');
  if (token && !token.startsWith('simulated_token_')) {
    try {
      const res = await fetch(`${API_BASE}/api/ai/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ mode, message: prompt }) });
      const data = await res.json(); if (res.ok && data.response) return data.response;
    } catch(err) {}
  }
  let provider = localStorage.getItem('smartlearn_ai_provider') || 'groq';
  let apiKey   = localStorage.getItem('smartlearn_ai_key') || '';
  let model    = localStorage.getItem('smartlearn_ai_model') || '';

  // If local storage is empty, fallback to the hardcoded system permanent configuration
  if (!apiKey) {
    if (SYSTEM_PERMANENT_CONFIG.apiKey && SYSTEM_PERMANENT_CONFIG.apiKey !== 'YOUR_GROQ_API_KEY_HERE') {
      provider = SYSTEM_PERMANENT_CONFIG.provider;
      apiKey   = SYSTEM_PERMANENT_CONFIG.apiKey;
      model    = SYSTEM_PERMANENT_CONFIG.model;
    } else {
      // If no valid permanent key is set in the code, fallback to keyless mode for security
      provider = 'keyless';
      apiKey   = '';
      model    = '';
    }
  }

  const sysText  = systemInstruction || getSystemPrompt(mode);

  // ── Gemini ──────────────────────────────────────────────────────────────
  if (provider === 'gemini' && apiKey) {
    updateApiStatusBadge('gemini');
    const historyContents = chatSessionHistory.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] }));
    const payload = {
      contents: [...historyContents, { role: 'user', parts: [{ text: prompt }] }],
      systemInstruction: { parts: [{ text: sysText }] },
      generationConfig: { temperature: 0.7, topK: 40, topP: 0.95, maxOutputTokens: 2048 }
    };
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }
    );
    const data = await response.json();
    if (response.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) return data.candidates[0].content.parts[0].text;
    const gErrMsg = data?.error?.message || `Gemini API error ${response.status}`;
    throw new Error(`Gemini API: ${gErrMsg}`);
  }

  // ── OpenAI ──────────────────────────────────────────────────────────────
  if (provider === 'openai' && apiKey) {
    updateApiStatusBadge('openai');
    const messages = [
      { role: 'system', content: sysText },
      ...chatSessionHistory.map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content })),
      { role: 'user', content: prompt }
    ];
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({ model: 'gpt-4o-mini', messages, max_tokens: 2048, temperature: 0.7 })
    });
    const data = await response.json();
    if (response.ok && data.choices?.[0]?.message?.content) return data.choices[0].message.content;
    const oErrMsg = data?.error?.message || `OpenAI API error ${response.status}`;
    throw new Error(`OpenAI API: ${oErrMsg}`);
  }

  // ── OpenRouter ──────────────────────────────────────────────────────────
  if (provider === 'openrouter' && apiKey) {
    updateApiStatusBadge('openrouter');
    const activeModel = model || localStorage.getItem('smartlearn_ai_model') || 'meta-llama/llama-3.1-8b-instruct:free';
    const messages = [
      { role: 'system', content: sysText },
      ...chatSessionHistory.map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content })),
      { role: 'user', content: prompt }
    ];
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}`, 'HTTP-Referer': 'https://smartlearn.edu.gh', 'X-Title': 'SmartLearn AI' },
      body: JSON.stringify({ model: activeModel, messages, max_tokens: 2048 })
    });
    const data = await response.json();
    if (response.ok && data.choices?.[0]?.message?.content) return data.choices[0].message.content;
    const rErrMsg = data?.error?.message || `OpenRouter error ${response.status}`;
    throw new Error(`OpenRouter API: ${rErrMsg}`);
  }

  // ── Groq (Free tier) ──────────────────────────────────────────────────────
  if (provider === 'groq' && apiKey) {
    updateApiStatusBadge('groq');
    const activeGroqModel = model || localStorage.getItem('smartlearn_ai_model') || 'llama-3.1-8b-instant';
    const messages = [
      { role: 'system', content: sysText },
      ...chatSessionHistory.map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content })),
      { role: 'user', content: prompt }
    ];
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({ model: activeGroqModel, messages, max_tokens: 2048, temperature: 0.7 })
    });
    const data = await response.json();
    if (response.ok && data.choices?.[0]?.message?.content) return data.choices[0].message.content;
    const gqErr = data?.error?.message || `Groq error ${response.status}`;
    throw new Error(`Groq API: ${gqErr}`);
  }

  // ── Keyless fallback (Pollinations) ─────────────────────────────────────
  try {
    updateApiStatusBadge('keyless');
    // POST to the correct Pollinations OpenAI-compatible endpoint
    const response = await fetch('https://text.pollinations.ai/openai', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [{ role: 'system', content: sysText }, { role: 'user', content: prompt }], model: 'openai-large', private: true })
    });
    if (response.ok) {
      const data = await response.json().catch(() => null);
      if (data?.choices?.[0]?.message?.content) return data.choices[0].message.content;
      const txt = await response.clone().text().catch(() => '');
      if (txt) return txt;
    }
    // GET fallback
    const getRes = await fetch(`https://text.pollinations.ai/${encodeURIComponent(prompt)}?system=${encodeURIComponent(sysText)}&model=openai-large&private=true`);
    if (getRes.ok) return await getRes.text();
  } catch(err) {}
  throw new Error('Unable to connect to AI. Please select a provider and add an API key in the panel on the left.');
}
async function sendAiMessage() {
  const input = D.get('ai-chat-input'); if (!input || !input.value.trim()) return; const text = input.value.trim(); appendChatMessage('user', text);
  chatSessionHistory.push({ role: 'user', content: text }); input.value = ''; const box = D.get('ai-chat-messages'); const typing = document.createElement('div'); typing.className = 'message-bubble message-ai typing-indicator'; typing.innerHTML = 'Thinking...'; box.appendChild(typing); box.scrollTop = box.scrollHeight;
  try {
    const res = await executeClientAiRequest(text, getSystemPrompt(currentAiMode), currentAiMode); typing.remove(); appendChatMessage('ai', res); chatSessionHistory.push({ role: 'assistant', content: res });
  } catch (err) {
    typing.remove();
    const provider = localStorage.getItem('smartlearn_ai_provider') || 'keyless';
    const hasKey   = !!localStorage.getItem('smartlearn_ai_key');
    let hint = '';
    if (!hasKey && provider !== 'keyless') hint = ' (No API key saved — please paste your key in the AI Provider panel on the left.)';
    appendChatMessage('ai', `⚠️ ${err.message}${hint}`);
  }
}
async function simulateSummarizeNote(title) {
  switchTab('student', 'student-ai-assistant'); setAiMode('study');
  appendChatMessage('user', `Please summarize: "${title}"`); const box = D.get('ai-chat-messages'), typing = document.createElement('div'); typing.className = 'message-bubble message-ai typing-indicator'; typing.innerHTML = 'Analyzing...'; box.appendChild(typing);
  try {
    const res = await executeClientAiRequest(`Summarize note slide: "${title}". Give core objectives, outlines and a practice question.`, getSystemPrompt('study'), 'study'); typing.remove(); appendChatMessage('ai', res);
  } catch(e){ typing.remove(); } }
function searchPastQuestions() {
  const query = D.val('pq-search-input').toUpperCase(), list = D.get('pq-results-list'); if (!list) return; list.innerHTML = '';
  const mockPqs = [
    { code: 'CS101', title: 'CS101 Intro to Coding Exam (2024)', year: '2024', semester: 'Sem 1' },
    { code: 'CS101', title: 'CS101 Mid-Sem Test Questions (2023)', year: '2023', semester: 'Sem 2' },
    { code: 'MATH102', title: 'MATH102 Calculus II Final Exam (2024)', year: '2024', semester: 'Sem 1' },
    { code: 'ENG201', title: 'ENG201 Software Architectures Final (2024)', year: '2024', semester: 'Sem 1' }
  ]; const filtered = mockPqs.filter(pq => pq.code.includes(query) || pq.title.toUpperCase().includes(query));
  if (!filtered.length) { list.innerHTML = '<p style="color:var(--text-muted); text-align:center; padding:20px;">No results found.</p>'; return; }
  filtered.forEach(pq => {
    list.innerHTML += `
      <div class="glass" style="padding:16px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <span class="badge badge-primary">${pq.code}</span> <h4 style="font-size:0.95rem; margin-top:4px;">${pq.title}</h4>
          <span style="font-size:0.75rem; color:var(--text-light)">Year ${pq.year} • Semester: ${pq.semester}</span>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="simulatePqExplain('${pq.title}')">AI Explain</button>
      </div>`; }); }
async function simulatePqExplain(title) {
  switchTab('student', 'student-ai-assistant'); setAiMode('study');
  appendChatMessage('user', `Explain solution of: "${title}"`); const box = D.get('ai-chat-messages'), typing = document.createElement('div'); typing.className = 'message-bubble message-ai typing-indicator'; typing.innerHTML = 'Solving...'; box.appendChild(typing);
  try {
    const res = await executeClientAiRequest(`Explain past question paper solutions step-by-step: "${title}"`, getSystemPrompt('study'), 'study'); typing.remove(); appendChatMessage('ai', res);
  } catch(e){ typing.remove(); } }
let careerScores = { programming: 0, business: 0, datascience: 0, engineering: 0, healthcare: 0, law: 0 }, currentQuestionIndex = 0;
function renderCareerQuizQuestion() {
  const container = D.get('career-quiz-slide-container'); if (!container) return; const q = careerQuizQuestions[currentQuestionIndex];
  const optionsHtml = q.options.map(opt => `<div class="option-card" onclick="selectCareerOption(this, '${opt.category}')"><div class="option-check"></div> ${opt.text}</div>`).join('');
  container.innerHTML = `<div class="question-slide active"><h3 class="question-title">${q.title}</h3><div class="options-list">${optionsHtml}</div></div>`; D.get('career-next-btn').disabled = true; }
function selectCareerOption(element, category) {
  element.parentElement.querySelectorAll('.option-card').forEach(card => card.classList.remove('selected')); element.classList.add('selected'); element.setAttribute('data-choice', category); D.get('career-next-btn').disabled = false; }
function nextCareerQuestion() {
  const activeSlide = document.querySelector('.question-slide.active'), selected = activeSlide.querySelector('.option-card.selected'); if (!selected) return; const choice = selected.getAttribute('data-choice'); careerScores[choice] = (careerScores[choice] || 0) + 1; currentQuestionIndex++; const progressPercent = ((currentQuestionIndex) / careerQuizQuestions.length) * 100;
  D.get('career-progress-bar').style.width = `${progressPercent}%`; if (currentQuestionIndex < careerQuizQuestions.length) renderCareerQuizQuestion(); else showCareerResults(); }
function showCareerResults() {
  D.show('career-quiz-box', false); D.show('career-result-box', true); let topCategory = 'programming', maxScore = -1;
  for (let key in careerScores) { if (careerScores[key] > maxScore) { maxScore = careerScores[key]; topCategory = key; } }
  const data = appState.careersDb[topCategory];
  D.html('career-result-title', `Recommended Track: ${data.programs[0]}`); D.html('career-result-desc', data.description); D.html('career-result-salary', data.salary); D.html('career-result-demand', data.demand);
  D.html('career-result-skills', data.skills.map(s => `<span class="badge badge-primary">${s}</span>`).join(' '));
  D.html('career-result-unis', data.universities.map(u => `<li>📍 <strong>${u}</strong> - High placement rates</li>`).join('')); const visualNode = D.get('visual-node-end'); if (visualNode) visualNode.textContent = data.programs[0]; }
function resetCareerQuiz() {
  careerScores = { programming: 0, business: 0, datascience: 0, engineering: 0, healthcare: 0, law: 0 }; currentQuestionIndex = 0; D.show('career-quiz-box', true); D.show('career-result-box', false); D.get('career-progress-bar').style.width = '20%'; renderCareerQuizQuestion(); }
/* =========================================================
   GPA UNIVERSITY DROPDOWN — data + renderer
   ========================================================= */
const GPA_UNIVERSITIES = [
  { group: 'Traditional Universities' },
  { id:'ug',  name:'University of Ghana (UG / Legon)', scale:'4.0 GPA', system:'standard_4',
    tip:'Grade points 0–4.0. A=4.0, B+=3.5, B=3.0, C+=2.5, C=2.0, D+=1.5, D=1.0, F=0. CGPA = total grade points ÷ total credits. First Class ≥ 3.60.' },
  { id:'knust', name:'KNUST', scale:'CWA %', system:'knust',
    tip:'Cumulative Weighted Average (%). CWA = Σ(raw score × credit hrs) ÷ total credit hrs. First Class ≥ 70%.' },
  { id:'ucc',  name:'UCC — Univ. of Cape Coast', scale:'4.0 GPA', system:'standard_4',
    tip:'4.0 scale. A=4.0, B+=3.5, B=3.0, C+=2.5, C=2.0, D+=1.5, D=1.0, E=0. CGPA = grade points ÷ total credits. First Class ≥ 3.60.' },
  { id:'gimpa', name:'GIMPA', scale:'4.0 GPA', system:'standard_4',
    tip:'4.0 scale. A=4.0, A−=3.75, B+=3.5, B=3.0, C=2.0. CGPA = total grade points ÷ credits. First Class ≥ 3.60.' },
  { id:'uds',  name:'UDS — Univ. for Development Studies', scale:'4.0 GPA', system:'standard_4',
    tip:'Standard 4.0 CGPA. Grade points weighted by credit hours. First Class ≥ 3.60.' },
  { id:'uenr', name:'UENR — Univ. of Energy & Natural Resources', scale:'4.0 GPA', system:'standard_4',
    tip:'Standard 4.0 CGPA. Grade points × credit hrs ÷ total credits. First Class ≥ 3.60.' },
  { group: 'Technical Universities' },
  { id:'atu',  name:'ATU — Accra Technical University', scale:'4.0 GPA', system:'standard_4',
    tip:'4.0 CGPA system. A=4.0, B+=3.5, B=3.0, C+=2.5, C=2.0, D=1.0, F=0. Grade pts × credits ÷ total credits. First Class ≥ 3.60.' },
  { id:'kstu', name:'KsTU — Kumasi Technical University', scale:'4.0 GPA', system:'standard_4',
    tip:'4.0 CGPA. Same scale as ATU. Grade points weighted by credit hours. First Class ≥ 3.60.' },
  { id:'ttu',  name:'TTU — Takoradi Technical University', scale:'4.0 GPA', system:'standard_4',
    tip:'4.0 CGPA. Standard grade point scale. Weighted by credit hours. First Class ≥ 3.60.' },
  { id:'htu',  name:'HTU — Ho Technical University', scale:'4.0 GPA', system:'standard_4',
    tip:'4.0 CGPA. A=4.0 down to F=0. Grade pts × credit hrs ÷ total credits. First Class ≥ 3.60.' },
  { id:'ktu',  name:'KTU — Koforidua Technical University', scale:'4.0 GPA', system:'standard_4',
    tip:'4.0 CGPA. Standard scale. Weighted grade point average. First Class ≥ 3.60.' },
  { id:'cctu', name:'CCTU — Cape Coast Technical University', scale:'4.0 GPA', system:'standard_4',
    tip:'4.0 CGPA. Grade pts weighted by credit hrs. First Class ≥ 3.60.' },
  { group: 'Private Universities' },
  { id:'ashesi',    name:'Ashesi University', scale:'4.0 GPA', system:'standard_4',
    tip:'US-style 4.0 GPA. A=4.0, B=3.0, C=2.0, D=1.0, F=0. Weighted by credit hours. First Class (Distinction) ≥ 3.60.' },
  { id:'lancaster', name:'Lancaster University Ghana', scale:'4.0 GPA', system:'standard_4',
    tip:'UK-adapted 4.0 GPA scale. A=4.0, B+=3.5, B=3.0, C=2.0, D=1.0. Weighted by credit hours. First Class ≥ 3.60.' },
  { id:'vvu',       name:'Valley View University (VVU)', scale:'4.0 GPA', system:'standard_4',
    tip:'Standard 4.0 CGPA. A=4.0, B+=3.5, B=3.0... Min. graduation CGPA 2.00. First Class ≥ 3.60.' },
  { id:'pentecost', name:'Pentecost University', scale:'4.0 GPA', system:'standard_4',
    tip:'4.0 GPA scale. FGPA = Σ(grade pts × credits) ÷ total credits. First Class ≥ 3.60.' },
  { id:'mug',       name:'Methodist University Ghana (MUG)', scale:'4.0 GPA', system:'standard_4',
    tip:'4.0 FGPA system. Grade pts weighted by credit hours each semester. First Class ≥ 3.60.' },
  { id:'pug',       name:'Presbyterian University Ghana (PUG)', scale:'4.0 GPA', system:'standard_4',
    tip:'Standard 4.0 CGPA. Grade points × credit hrs ÷ total credits. First Class ≥ 3.60.' },
  { id:'cug',       name:'Catholic University of Ghana (CUG)', scale:'4.0 GPA', system:'standard_4',
    tip:'4.0 CGPA. A=4.0 through F=0. Weighted by credit hours. First Class ≥ 3.60.' },
  { id:'anu',       name:'All Nations University (ANU)', scale:'4.0 GPA', system:'standard_4',
    tip:'4.0 CGPA. Standard Ghanaian scale. Grade pts × credit hrs ÷ total credits. First Class ≥ 3.60.' },
  { id:'regent',    name:'Regent University College', scale:'4.0 GPA', system:'standard_4',
    tip:'4.0 CGPA. Standard scale. Weighted average of grade points. First Class ≥ 3.60.' },
  { id:'bluecrest', name:'BlueCrest University College', scale:'4.0 GPA', system:'standard_4',
    tip:'4.0 CGPA. A=4.0, B+=3.5, B=3.0, C+=2.5, C=2.0. Weighted by credit hours. First Class ≥ 3.60.' },
  { id:'wisconsin', name:"Wisconsin Int'l University College", scale:'4.0 GPA', system:'standard_4',
    tip:'4.0 CGPA. Standard Ghanaian grade point scale. First Class ≥ 3.60.' },
  { id:'academiccity', name:'Academic City University College', scale:'4.0 GPA', system:'standard_4',
    tip:'4.0 CGPA. A=4.0 → F=0. Weighted by credit hours per semester. First Class ≥ 3.60.' },
  { id:'webster',   name:'Webster University Ghana', scale:'4.0 GPA', system:'standard_4',
    tip:'US-style 4.0 GPA. A=4.0, A−=3.7, B+=3.3, B=3.0, B−=2.7... Weighted by credit hours. First Class ≥ 3.60.' },
  { id:'central',   name:'Central University', scale:'4.0 GPA', system:'standard_4',
    tip:'4.0 CGPA. Standard Ghanaian scale. Grade pts weighted by credits. First Class ≥ 3.60.' },
];
let currentGpaUniSystem = 'standard_4', currentGpaUniName = 'University of Ghana (UG / Legon)';

function renderGpaUniDropdown() {
  const container = D.get('gpa-uni-dropdown-container');
  if (!container) return;

  // Tooltip element (shared, singleton)
  let tooltip = D.get('gpu-tooltip-el');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = 'gpu-tooltip-el';
    tooltip.className = 'gpu-tooltip';
    document.body.appendChild(tooltip);
  }
  let hoverTimer = null;

  const wrap = document.createElement('div');
  wrap.className = 'gpu-wrap';

  // ── Trigger bar ──────────────────────────────────────────
  const trigger = document.createElement('div');
  trigger.className = 'gpu-trigger';
  const triggerLeft = document.createElement('span');
  triggerLeft.className = 'gpu-trigger-name';
  triggerLeft.style.cssText = 'flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size:0.8rem;';
  triggerLeft.textContent = currentGpaUniName;
  const triggerBadge = document.createElement('span');
  triggerBadge.className = 'gpu-scale-badge';
  triggerBadge.textContent = currentGpaUniSystem === 'knust' ? 'CWA %' : '4.0 GPA';
  const chevron = document.createElement('span');
  chevron.className = 'gpu-chevron';
  chevron.textContent = '\u25BC';
  trigger.appendChild(triggerLeft);
  trigger.appendChild(triggerBadge);
  trigger.appendChild(chevron);

  // ── Options panel ─────────────────────────────────────────
  const panel = document.createElement('div');
  panel.className = 'gpu-panel';

  GPA_UNIVERSITIES.forEach(u => {
    if (u.group) {
      const hdr = document.createElement('div');
      hdr.className = 'gpu-group-header';
      hdr.textContent = u.group;
      panel.appendChild(hdr);
      return;
    }
    const opt = document.createElement('div');
    opt.className = 'gpu-option' + (u.id === (currentGpaUniSystem === 'knust' ? 'knust' : '') ? ' selected' : '');
    opt.dataset.system = u.system;
    opt.dataset.name   = u.name;
    opt.dataset.tip    = u.tip;

    const nameEl = document.createElement('span');
    nameEl.className = 'gpu-option-name';
    nameEl.textContent = u.name;

    const badge = document.createElement('span');
    badge.className = 'gpu-option-badge ' + (u.system === 'knust' ? 'cwa' : 'gpa4');
    badge.textContent = u.scale;

    opt.appendChild(nameEl);
    opt.appendChild(badge);

    // 3-second hover tooltip
    opt.addEventListener('mouseenter', function(e) {
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(() => {
        tooltip.innerHTML = `<strong>${u.name}</strong>${u.tip}`;
        tooltip.style.display = 'block';
        // Position near mouse
        const x = Math.min(e.clientX + 12, window.innerWidth - 250);
        const y = Math.min(e.clientY + 12, window.innerHeight - 120);
        tooltip.style.left = x + 'px';
        tooltip.style.top  = y + 'px';
      }, 3000);
    });
    opt.addEventListener('mousemove', function(e) {
      if (tooltip.style.display === 'block') {
        const x = Math.min(e.clientX + 12, window.innerWidth - 250);
        const y = Math.min(e.clientY + 12, window.innerHeight - 120);
        tooltip.style.left = x + 'px';
        tooltip.style.top  = y + 'px';
      }
    });
    opt.addEventListener('mouseleave', function() {
      clearTimeout(hoverTimer);
      tooltip.style.display = 'none';
    });

    // Selection
    opt.addEventListener('click', function() {
      currentGpaUniSystem = u.system;
      currentGpaUniName   = u.name;
      triggerLeft.textContent = u.name;
      triggerBadge.textContent = u.scale;
      panel.querySelectorAll('.gpu-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      wrap.classList.remove('open');
      tooltip.style.display = 'none';
      clearTimeout(hoverTimer);
      updateGpaPredictor();
    });
    panel.appendChild(opt);
  });

  // Toggle open/close
  trigger.addEventListener('click', () => wrap.classList.toggle('open'));
  document.addEventListener('click', e => { if (!wrap.contains(e.target)) wrap.classList.remove('open'); }, true);

  wrap.appendChild(trigger);
  wrap.appendChild(panel);
  container.innerHTML = '';
  container.appendChild(wrap);
}

function updateGpaPredictor() {
  const sys = currentGpaUniSystem || 'standard_4';
  const isKnust = sys === 'knust';
  const sliders = ['cs101','math102','eng201','bua202'];

  // Adapt slider range dynamically
  sliders.forEach(id => {
    const el = D.get(`gpa-slide-${id}`);
    if (!el) return;
    if (isKnust) { el.min = '0'; el.max = '100'; el.step = '1'; }
    else { el.min = '0'; el.max = '4'; el.step = '0.5'; }
  });

  const vals = sliders.map(id => parseFloat(D.val(`gpa-slide-${id}`) || 0));

  if (isKnust) {
    // KNUST: CWA = simple average of raw percentage marks
    vals.forEach((v,i) => D.html(`val-${sliders[i]}`, getGradeLabel(v, 'knust')));
    const cwa = (vals.reduce((a,b)=>a+b,0)/vals.length).toFixed(1);
    const display = D.get('predicted-gpa-score');
    if (display) { display.textContent = cwa + '%'; display.style.color = cwa>=70?'var(--success)':cwa>=60?'var(--primary)':cwa>=50?'var(--warning)':'var(--danger)'; }
    if (D.get('gpa-result-label')) D.html('gpa-result-label','Predicted Term CWA Score');
    if (D.get('gpa-honours-band')) D.html('gpa-honours-band', getHonoursBand(parseFloat(cwa), 'knust'));
  } else {
    // Standard 4.0 GPA
    vals.forEach((v,i) => D.html(`val-${sliders[i]}`, getGradeLabel(v, 'gpa4')));
    const avg = (vals.reduce((a,b)=>a+b,0)/vals.length).toFixed(2);
    const display = D.get('predicted-gpa-score');
    if (display) { display.textContent = avg; display.style.color = avg>=3.6?'var(--success)':avg>=3.0?'var(--primary)':avg>=2.0?'var(--warning)':'var(--danger)'; }
    if (D.get('gpa-result-label')) D.html('gpa-result-label','Predicted Term GPA Score');
    if (D.get('gpa-honours-band')) D.html('gpa-honours-band', getHonoursBand(parseFloat(avg), 'gpa4'));
  }
}
function getHonoursBand(score, system) {
  const bands = system === 'knust'
    ? [
        { label: '🏆 First Class',        range: 'CWA ≥ 70%',   min: 70,  max: Infinity },
        { label: '🥈 Second Class Upper', range: '60 – 69.9%',  min: 60,  max: 70 },
        { label: '🥉 Second Class Lower', range: '50 – 59.9%',  min: 50,  max: 60 },
        { label: '📘 Third Class',         range: '45 – 49.9%',  min: 45,  max: 50 },
        { label: '✅ Pass',                range: '40 – 44.9%',  min: 40,  max: 45 },
        { label: '❌ Fail',                range: '< 40%',       min: -Infinity, max: 40 }
      ]
    : [
        { label: '🏆 First Class',        range: 'GPA ≥ 3.60',  min: 3.60, max: Infinity },
        { label: '🥈 Second Class Upper', range: '3.00 – 3.59', min: 3.00, max: 3.60 },
        { label: '🥉 Second Class Lower', range: '2.50 – 2.99', min: 2.50, max: 3.00 },
        { label: '📘 Third Class',         range: '2.00 – 2.49', min: 2.00, max: 2.50 },
        { label: '✅ Pass',                range: '1.00 – 1.99', min: 1.00, max: 2.00 },
        { label: '❌ Fail',                range: '< 1.00',      min: -Infinity, max: 1.00 }
      ];

  const rows = bands.map(b => {
    const active = score >= b.min && score < b.max;
    const dotColor  = active ? (b.label.includes('🏆')?'#10b981': b.label.includes('🥈')?'#6366f1': b.label.includes('🥉')?'#f59e0b': b.label.includes('📘')?'#3b82f6': b.label.includes('✅')?'#94a3b8':'#ef4444') : 'transparent';
    const bg        = active ? `background:rgba(${b.label.includes('🏆')?'16,185,129': b.label.includes('🥈')?'99,102,241': b.label.includes('🥉')?'245,158,11': b.label.includes('📘')?'59,130,246': b.label.includes('✅')?'148,163,184':'239,68,68'},0.1);` : '';
    const textColor = active ? '' : 'opacity:0.45;';
    const fontW     = active ? 'font-weight:700;' : '';
    return `<div style="display:flex;align-items:center;justify-content:space-between;padding:5px 8px;border-radius:6px;${bg}${textColor}">
      <span style="display:flex;align-items:center;gap:6px;font-size:0.74rem;${fontW}">
        <span style="width:7px;height:7px;border-radius:50%;background:${dotColor};border:1px solid #cbd5e1;flex-shrink:0;"></span>
        ${b.label}
      </span>
      <span style="font-size:0.7rem;color:#94a3b8;white-space:nowrap;">${b.range}</span>
    </div>`;
  }).join('');

  return `<div style="font-size:0.73rem;border:1px solid var(--border);border-radius:8px;overflow:hidden;">${rows}</div>`;
}
const getGradeLabel = (val, system) => {
  if (system === 'knust') {
    // KNUST CWA: raw percentage -> letter + grade description
    if (val >= 80) return 'A (Excellent)';
    if (val >= 70) return 'B (Very Good)';
    if (val >= 60) return 'C (Good)';
    if (val >= 50) return 'D (Pass)';
    if (val >= 45) return 'E (Weak Pass)';
    return 'F (Fail)';
  }
  // Standard 4.0 GPA
  if (val === 4.0) return 'A (4.0)';
  if (val === 3.5) return 'B+ (3.5)';
  if (val === 3.0) return 'B (3.0)';
  if (val === 2.5) return 'C+ (2.5)';
  if (val === 2.0) return 'C (2.0)';
  if (val === 1.5) return 'D+ (1.5)';
  if (val === 1.0) return 'D (1.0)';
  return 'F (0.0)';
},selectMood = (emoji, message) => {
  const tip = emoji === '😫' || emoji === '🤯' ? 'Take a 15-minute screen-free break. Put on comfortable shoes and walk around. Or ask your Study Planner to reduce your load!'
    : emoji === '😐' ? 'Keep going! Plan study intervals using the Pomodoro technique (25m study, 5m break).'
    : 'Leverage this high positive energy to master your heavy programming modules today!'; D.html('mood-response-box', `<div class="glass" style="padding:16px; margin-top:16px; border-left: 4px solid var(--primary);"><p>You selected ${emoji}.</p><p style="color:var(--text-muted); font-size:0.85rem; margin-top:6px;">${tip}</p></div>`);
},
updateStressMeter = val => {
  const bar = D.get('stress-fill-bar');
  if (bar) { bar.style.width = `${val}%`; bar.style.backgroundColor = val > 75 ? 'var(--danger)' : val > 45 ? 'var(--warning)' : 'var(--success)'; } };
async function generateDailyStudyPlan() {
  const hours = parseInt(D.val('plan-hours-input')) || 4, box = D.get('generated-study-plan-box'); if (!box) return; box.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div> Optimizing...';
  try {
    const res = await executeClientAiRequest(`Generate a customized study timetable for a ${hours}-hour study session covering CS101 and MATH102. Output only clean HTML list elements.`, 'Return HTML timetable lists.', 'study'); box.innerHTML = `<div class="glass" style="padding:20px; border-left:4px solid var(--secondary);"><h4>Custom study schedule (${hours}h)</h4>${res}</div>`;
  } catch (err) { box.innerHTML = `<div class="glass" style="color:var(--danger)">Failed to generate plan.</div>`; } }
function generateCalendarGrid() {
  const container = D.get('portal-calendar-grid'); if (!container) return;
  let html = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => `<div class="calendar-header-day">${d}</div>`).join(''); for (let i = 0; i < 5; i++) html += '<div class="calendar-day-cell inactive"></div>'; for (let day = 1; day <= 30; day++) {
    const act = day === 24 ? 'today' : '',
          event = day === 28 ? '<div class="calendar-event-dot danger">CS101 Deadline</div>' : day === 30 ? '<div class="calendar-event-dot warning">MATH102 Exam</div>' : '';
    html += `<div class="calendar-day-cell ${act}"><span>${day}</span>${event}</div>`; }
  container.innerHTML = html; }
let activeSubmittingAsgId = null;
const openSubmitAssignmentModal = (id, title) => { activeSubmittingAsgId = id; D.html('modal-asg-title', title); D.show('assignment-submit-modal', true); }, closeSubmitAssignmentModal = () => D.show('assignment-submit-modal', false);
async function simulateSubmitFile() {
  const input = D.get('asg-file-upload'); if (!input || !input.files.length) return showToastNotification('Select a file.'); const file = input.files[0]; if (!/\.(pdf|docx|ppt|zip)$/i.test(file.name)) return showToastNotification('Allowed formats: PDF, DOCX, PPT, ZIP.'); const token = localStorage.getItem('proto_token');
  if (token && token.startsWith('simulated_token_')) {
    const asg = appState.assignments.find(a => a.id == activeSubmittingAsgId); if (asg) asg.status = 'Submitted';
    appState.submissions.push({ id: Date.now(), assignmentId: parseInt(activeSubmittingAsgId), studentName: appState.user?.name || 'Kofi Mensah', fileName: file.name, date: new Date().toISOString().split('T')[0], grade: null, feedback: null }); saveOfflineState(); closeSubmitAssignmentModal(); showToastNotification('Submitted successfully (Offline)!'); renderStateData(); return; }
  const formData = new FormData(); formData.append('assignmentId', activeSubmittingAsgId); formData.append('homework', file);
  try {
    const res = await fetch(`${API_BASE}/api/assignments/submit`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` }, body: formData }); const data = await res.json(); if (res.ok) { closeSubmitAssignmentModal(); showToastNotification(`Submitted! Plagiarism: ${data.plagiarismScore}%`); renderStateData(); }
  } catch (e) {} }
async function simulateLecturerUploadNote() {
  if (appState.role !== 'lecturer' && appState.role !== 'admin') return showToastNotification('Lecturers only.'); const title = D.val('lecturer-note-title'), courseId = D.val('lecturer-note-course'); if (!title) return showToastNotification('Enter a title.'); const token = localStorage.getItem('proto_token');
  if (token && token.startsWith('simulated_token_')) {
    appState.notes.push({ id: Date.now(), courseId, title: `${title}.pdf`, date: new Date().toISOString().split('T')[0], size: '1.2 MB' }); appState.courses.find(c => c.id == courseId).notesCount++;
    appState.notifications.unshift({ id: Date.now(), text: `New notes: ${title}`, date: 'Just now', unread: true }); D.val('lecturer-note-title', ''); saveOfflineState(); showToastNotification('Uploaded successfully (Offline)!'); renderStateData(); return; }
  const noteBlob = new Blob([`Content: ${title}`], { type: 'application/pdf' }), formData = new FormData(); formData.append('courseId', courseId); formData.append('title', title); formData.append('note', noteBlob, `${title}.pdf`);
  try {
    const res = await fetch(`${API_BASE}/api/courses/upload-note`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` }, body: formData });
    if (res.ok) { D.val('lecturer-note-title', ''); showToastNotification('Uploaded notes successfully!'); renderStateData(); }
  } catch (e) {} }
async function simulateLecturerCreateAsg() {
  if (appState.role !== 'lecturer' && appState.role !== 'admin') return showToastNotification('Lecturers only.'); const title = D.val('lecturer-asg-title'), courseId = D.val('lecturer-asg-course'), deadline = D.val('lecturer-asg-deadline') || '2026-06-10'; if (!title) return showToastNotification('Enter a title.'); const token = localStorage.getItem('proto_token');
  if (token && token.startsWith('simulated_token_')) {
    appState.assignments.push({ id: Date.now(), courseId, title, deadline, totalPoints: 100, status: 'Pending' }); appState.courses.find(c => c.id == courseId).assignmentsCount++; D.val('lecturer-asg-title', ''); saveOfflineState(); showToastNotification('Assignment created (Offline)!'); renderStateData(); return; }
  try {
    const res = await fetch(`${API_BASE}/api/assignments/create`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ title, courseId, deadline, totalPoints: 100, description: 'Solve assignment guidelines.' }) });
    if (res.ok) { D.val('lecturer-asg-title', ''); showToastNotification('Assignment published!'); renderStateData(); }
  } catch (e) {} }
async function calculateProgramSuitability(program, score) {
  const box = D.get('ai-suitability-display-box'); if (!box) return; box.innerHTML = '<div class="glass" style="padding: 24px; text-align: center;">Calculating compatibility...</div>';
  try {
    const res = await executeClientAiRequest(`Analyze my suitability for "${program}" given my CGPA of 3.82 and CS101 grade of 4.0. Return ONLY JSON structure: {"score": 95, "standing": "Excellent", "justification": "Details"}`, 'Return JSON data only.', 'career'); let clean = res.trim(); if (clean.includes('{')) clean = clean.substring(clean.indexOf('{'), clean.lastIndexOf('}') + 1); const data = JSON.parse(clean), suitabilityScore = data.score || score, color = suitabilityScore >= 85 ? 'var(--success)' : 'var(--primary)';
    box.innerHTML = `
      <div class="glass" style="padding: 24px; display: grid; grid-template-columns: 90px 1fr; gap: 20px; align-items: center;">
        <div style="width: 80px; height: 80px; border-radius: var(--radius-full); border: 4px solid ${color}; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:1.2rem; color:${color};">${suitabilityScore}%</div>
        <div>
          <span class="badge badge-primary">${data.standing || 'Good Fit'}</span> <h3 style="margin:4px 0;">Compatibility: ${program}</h3>
          <p style="font-size:0.85rem; color:var(--text-muted);">${data.justification}</p>
        </div>
      </div>`; showToastNotification(`Match calculated!`);
  } catch (err) { box.innerHTML = `<div class="glass" style="color:var(--danger)">Check failed.</div>`; } }
const startFacultyChat = name => {
  const contact = appState.facultyContacts.find(c => c.name.toLowerCase().includes(name.toLowerCase())); if (contact) appState.activeFacultyEmail = contact.email; switchTab('student', 'student-faculty-chat'); renderFacultyChat(); showToastNotification(`Bridge opened to ${name}!`); };
async function scheduleFacultyCall() {
  const select = D.get('consult-recipient').value, date = D.val('consult-date'), topic = D.val('consult-purpose'); if (!topic) return showToastNotification('Enter a topic.'); const token = localStorage.getItem('proto_token');
  if (token && token.startsWith('simulated_token_')) {
    if (!appState.consultations) appState.consultations = [];
    appState.consultations.push({ id: Date.now(), topic, scheduledTime: date, duration: 30 }); D.val('consult-purpose', ''); saveOfflineState(); showToastNotification('Session scheduled (Offline)!'); renderStateData(); return; }
  try {
    const res = await fetch(`${API_BASE}/api/consultations/book`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ lecturerId: select, scheduledTime: date, topic, duration: 30 }) });
    if (res.ok) { D.val('consult-purpose', ''); showToastNotification('Session booked!'); renderStateData(); }
  } catch (e) {} }
function renderDedicatedAssignmentsDeck() {
  const container = D.get('dedicated-assignments-deck'); if (!container) return;
  container.innerHTML = appState.assignments.map(asg => {
    const course = appState.courses.find(c => c.id === asg.courseId), diff = Math.ceil((new Date(asg.deadline) - new Date('2026-05-24')) / 86400000),
          countdown = diff > 0 ? `Due in ${diff} Days` : 'Past Due',
          status = asg.status === 'Pending' ? `<button class="btn btn-primary btn-sm" onclick="openSubmitAssignmentModal(${asg.id}, '${asg.title}')">Submit File 🚀</button>` : '', gradeDetails = asg.grade ? `<div style="background: rgba(16,185,129, content0.03); border:1px solid var(--success); padding:12px; border-radius:6px; margin-top:10px; font-size:0.85rem;"><strong>Grade: ${asg.grade}/100</strong> - Feedback: "${asg.feedback}"</div>` : (asg.status === 'Submitted' ? '<div style="color:var(--warning); font-size:0.85rem; margin-top:8px;">Awaiting Grading</div>' : '');
    return `
      <div class="widget glass" style="margin-bottom:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div><span class="badge badge-primary">${course ? course.code : 'GEN'}</span> <span class="badge badge-warning">${countdown}</span> <h4 style="margin-top:6px;">${asg.title}</h4></div>
          ${status}
        </div>
        ${gradeDetails}
      </div>`;
  }).join(''); }
function getMappedRecommendations(uni) {
  const name = uni.name.toLowerCase(); if (name.includes('ashesi')) return ['Software Engineering', 'Business Management', 'Tech Entrepreneurship']; if (name.includes('ghana (ug)') || name.includes('legon')) return ['Medicine & Health', 'Law & Public Policy', 'Corporate Finance']; if (name.includes('kwame nkrumah') || name.includes('knust')) return ['Mechanical & Civil Engineering', 'Computer Engineering', 'Pharmacy & Health']; if (name.includes('cape coast (ucc)')) return ['Educational Pedagogy', 'Accounting & Finance', 'Optometry']; return uni.programsOffered.slice(0, 2).map(p => p.replace(/^(BSc|BA|BEd|BTech|Doctor of|Bachelor of)\s+/, '')); }
function renderStudentUniversities() {
  const container = D.get('uni-dynamic-grid-container'); if (!container) return;
  const query = appState.uniSearchQuery.toLowerCase(),
        filtered = appState.universities.filter(uni => (uni.name.toLowerCase().includes(query) || uni.location.toLowerCase().includes(query)) && (appState.selectedUniType === 'All' || uni.type === appState.selectedUniType));
  if (!filtered.length) { container.innerHTML = '<div style="padding:20px; text-align:center;">No universities found.</div>'; return; }
  container.innerHTML = filtered.map(uni => {
    const rating = 5.0 - (uni.ranking * 0.01), recs = getMappedRecommendations(uni).map(r => `<span class="badge" style="background:rgba(124,58,237, content0.1); color:#c084fc;">${r}</span>`).join(' ');
    return `
      <div class="uni-preview-card glass">
        <div class="uni-img-wrapper" style="height:150px;"><img src="${uni.image}" onerror="this.src='picture/ug_campus.jpg'"><span class="badge badge-primary" style="position:absolute; top:8px; right:8px;">Rank #${uni.ranking}</span></div>
        <div class="uni-preview-details" style="padding:16px;">
          <h4>${uni.name}</h4> <p style="font-size:0.8rem; color:var(--text-muted);">📍 ${uni.location} • Est. ${uni.established}</p>
          <div style="margin:4px 0;">${generateStarRatingHTML(rating)}</div>
          <div style="font-size:0.8rem; margin:8px 0;"><strong>Fees:</strong> ${uni.feesRange}</div>
          <div style="margin-top:6px;">${recs}</div>
          <button class="btn btn-secondary btn-sm" style="width:100%; margin-top:12px;" onclick="openUniRequirementsModal('${uni.id}')">View Details</button>
        </div>
      </div>`;
  }).join(''); }
const filterUniversitiesList = () => { appState.uniSearchQuery = D.val('uni-search-input') || ''; renderStudentUniversities(); },
filterUniversitiesType = type => {
  appState.selectedUniType = type;
  document.querySelectorAll('.uni-filter-btn').forEach(btn => btn.classList.toggle('active', btn.id === `filter-uni-${type.toLowerCase()}`)); renderStudentUniversities(); };
function openUniRequirementsModal(id) {
  const uni = appState.universities.find(u => u.id === id); if (!uni) return; D.html('uni-modal-badge', uni.type); D.get('uni-modal-badge').className = uni.type === 'Public' ? 'badge badge-success' : 'badge badge-primary'; D.html('uni-modal-name', uni.name); D.html('uni-modal-meta', `Ranked #${uni.ranking} • Est. ${uni.established} • 📍 ${uni.location}`); D.html('uni-modal-requirements', uni.admissionRequirements); D.html('uni-modal-performance', uni.performanceReview); D.html('uni-modal-fees', uni.feesRange); D.html('uni-modal-scholarships', uni.scholarshipsInfo); D.html('uni-modal-mapped-recs', getMappedRecommendations(uni).map(rec => `<span class="badge" style="background:rgba(124,58,237,0.1); color:#c084fc; margin-right:4px;">${rec}</span>`).join('')); D.html('uni-modal-programs', uni.programsOffered.map(p => `<span class="badge" style="background:rgba(255,255,255,0.05); margin-right:4px;">${p}</span>`).join('')); D.show('uni-requirements-modal', true); }
const closeUniRequirementsModal = () => D.show('uni-requirements-modal', false),
// ── AI Provider helpers ────────────────────────────────────────────────────
saveAiProvider = () => {
  const provider = D.val('ai-provider-select') || 'keyless';
  const key = D.val('gemini-key-input')?.trim() || '';
  const model = D.val('ai-model-select') || 'meta-llama/llama-3.1-8b-instruct:free';
  localStorage.setItem('smartlearn_ai_provider', provider);
  if (key) localStorage.setItem('smartlearn_ai_key', key); else localStorage.removeItem('smartlearn_ai_key');
  localStorage.setItem('smartlearn_ai_model', model);
  updateApiStatusBadge(key ? provider : 'keyless');
},
onAiProviderChange = () => {
  const provider = D.val('ai-provider-select') || 'keyless';
  const keyGroup   = D.get('ai-key-group');
  const modelGroup = D.get('ai-model-group');
  const keyLabel   = D.get('ai-key-label');
  const hint       = D.get('ai-provider-hint');
  const needsKey   = provider !== 'keyless';
  const needsModel = provider === 'openrouter' || provider === 'groq';
  if (keyGroup)   keyGroup.style.display   = needsKey   ? 'block' : 'none';
  if (modelGroup) modelGroup.style.display = needsModel ? 'block' : 'none';

  // Show only relevant model optgroups
  const grpOR   = D.get('model-group-openrouter');
  const grpGroq = D.get('model-group-groq');
  if (grpOR)   grpOR.style.display   = provider === 'openrouter' ? '' : 'none';
  if (grpGroq) grpGroq.style.display = provider === 'groq'       ? '' : 'none';

  // Set first option of active group as selected when switching
  if (needsModel) {
    const sel = D.get('ai-model-select');
    if (sel) {
      const activeGroup = provider === 'groq' ? grpGroq : grpOR;
      if (activeGroup) { const firstOpt = activeGroup.querySelector('option'); if (firstOpt) sel.value = firstOpt.value; }
    }
  }

  const labels = { gemini: 'Gemini API Key', openai: 'OpenAI API Key', openrouter: 'OpenRouter API Key', groq: 'Groq API Key' };
  if (keyLabel) keyLabel.textContent = labels[provider] || 'API Key';
  const hintLinks = {
    gemini:      'Free key at <a href="https://aistudio.google.com/" target="_blank" style="color:var(--primary);text-decoration:underline;">Google AI Studio</a>.',
    openai:      'Key from <a href="https://platform.openai.com/api-keys" target="_blank" style="color:var(--primary);text-decoration:underline;">OpenAI Platform</a> (pay-as-you-go).',
    openrouter:  'Free key from <a href="https://openrouter.ai/keys" target="_blank" style="color:var(--primary);text-decoration:underline;">OpenRouter.ai</a> — many free models.',
    groq:        'Free key from <a href="https://console.groq.com/keys" target="_blank" style="color:var(--primary);text-decoration:underline;">console.groq.com</a> — very fast, 14k req/day free.',
    keyless:     'No key needed. Powered by Pollinations AI (free).'
  };
  if (hint) hint.innerHTML = hintLinks[provider] || '';
  saveAiProvider();
},
loadAiProvider = () => {
  const provider = localStorage.getItem('smartlearn_ai_provider') || 'groq';
  let key        = localStorage.getItem('smartlearn_ai_key') || '';
  const model    = localStorage.getItem('smartlearn_ai_model') || 'llama-3.1-8b-instant';
  
  let displayProvider = provider;
  if (!key) {
    if (SYSTEM_PERMANENT_CONFIG.apiKey && SYSTEM_PERMANENT_CONFIG.apiKey !== 'YOUR_GROQ_API_KEY_HERE') {
      key = SYSTEM_PERMANENT_CONFIG.apiKey;
      displayProvider = SYSTEM_PERMANENT_CONFIG.provider;
    }
  }

  if (D.get('ai-provider-select')) D.val('ai-provider-select', provider);
  if (D.get('gemini-key-input'))   D.val('gemini-key-input', key);
  if (D.get('ai-model-select'))    D.val('ai-model-select', model);
  onAiProviderChange(); // sync visibility of key/model fields
  updateApiStatusBadge(key ? displayProvider : 'keyless');
  updateAiSettingsVisibility();
},
// Keep old name as alias for backward compat (called from old HTML if any)
saveGeminiKey = saveAiProvider,
toggleKeyVisibility = () => { const el = D.get('gemini-key-input'); if (el) el.type = el.type === 'password' ? 'text' : 'password'; },
loadGeminiKey = () => { loadAiProvider(); };
function updateApiStatusBadge(status) {
  const badge = D.get('api-status-badge'); if (!badge) return;
  const configs = {
    gemini:     { dot: 'var(--success)', bg: 'rgba(16,185,129,0.1)', color: 'var(--success)', label: 'Active: Gemini 2.0' },
    openai:     { dot: '#10a37f',        bg: 'rgba(16,163,127,0.1)', color: '#10a37f',        label: 'Active: OpenAI GPT-4o' },
    openrouter: { dot: '#ef6c00',        bg: 'rgba(239,108,0,0.1)',  color: '#ef6c00',        label: 'Active: OpenRouter' },
    groq:       { dot: '#f59e0b',        bg: 'rgba(245,158,11,0.1)', color: '#f59e0b',        label: 'Active: Groq ⚡' },
    keyless:    { dot: 'var(--primary)', bg: 'rgba(37,99,235,0.1)',  color: 'var(--primary)', label: 'Active: Keyless' }
  };
  const cfg = configs[status] || configs.keyless;
  badge.innerHTML = `<span style="width:6px;height:6px;background:${cfg.dot};border-radius:50%;display:inline-block;"></span> ${cfg.label}`;
  badge.style.background = cfg.bg;
  badge.style.color = cfg.color;
}
function updateAiSettingsVisibility() {
  const container = D.get('ai-api-settings-container');
  if (container) {
    container.style.display = (appState.role === 'admin') ? 'block' : 'none';
  }
}
function copyPermanentConfig() {
  const provider = localStorage.getItem('smartlearn_ai_provider') || 'groq';
  const key      = localStorage.getItem('smartlearn_ai_key') || 'YOUR_GROQ_API_KEY_HERE';
  const model    = localStorage.getItem('smartlearn_ai_model') || 'llama-3.1-8b-instant';
  const snippet = `const SYSTEM_PERMANENT_CONFIG = {
  provider: '${provider}',
  apiKey: '${key}',
  model: '${model}'
};`;
  navigator.clipboard.writeText(snippet).then(() => {
    showToastNotification('Config copied! Paste at the top of assets/js/app.js');
  }).catch(() => {
    alert("Exported Config (copy and paste at the top of assets/js/app.js):\n\n" + snippet);
  });
}
function toggleTheme() {
  const theme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'; document.body.setAttribute('data-theme', theme); appState.theme = theme; localStorage.setItem('smartlearn_theme', theme); document.querySelectorAll('.theme-toggle').forEach(btn => btn.innerHTML = theme === 'dark' ? '☀️' : '🌙'); }
function showToastNotification(msg) {
  const toast = document.createElement('div'); toast.className = 'glass'; toast.style.cssText = `position:fixed; bottom:24px; right:24px; padding:12px 20px; border-left:4px solid var(--success); color:var(--text-main); z-index:10000; font-weight:600;`; toast.textContent = '✅ ' + msg; document.body.appendChild(toast); setTimeout(() => toast.remove(), 3000); }
async function fetchPublicUniversities() {
  renderLandingUniversities();
  try { const res = await fetch(`${API_BASE}/api/universities`); if (res.ok) { appState.universities = await res.json(); renderLandingUniversities(); } } catch(err){} }
function generateStarRatingHTML(rating) {
  let html = `<div class="star-rating" title="Rating: ${rating.toFixed(1)} / 5">`; for (let i = 0; i < 5; i++) {
    const p = Math.min(Math.max((rating - i) * 100, 0), 100);
    html += `<span class="star-outer">★<span class="star-inner" style="width: ${p.toFixed(0)}%">★</span></span>`; }
  return html + ` <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: bold; margin-left: 4px;">(${rating.toFixed(1)})</span></div>`; }
let landingUnisExpanded = false;
function renderLandingUniversities() {
  const container = D.get('landing-uni-grid'); if (!container) return;
  container.innerHTML = appState.universities.map((uni, idx) => {
    const rating = 5.0 - (uni.ranking * 0.01), recs = getMappedRecommendations(uni).map(r => `<span class="badge" style="background:rgba(124,58,237, content0.1); color:#c084fc;">${r}</span>`).join(' '),
          disp = idx >= 4 && !landingUnisExpanded ? 'display: none;' : '';
    return `
      <div class="uni-preview-card glass" onclick="openUniRequirementsModalByName('${uni.name}')" style="${disp}">
        <div class="uni-img-wrapper" style="height:150px; position:relative;"><img src="${uni.image}" onerror="this.src='picture/ug_campus.jpg'"><span class="badge badge-primary" style="position:absolute; top:8px; right:8px;">Rank #${uni.ranking}</span></div>
        <div class="uni-preview-details" style="padding:16px;">
          <h4>${uni.name}</h4> <p style="font-size:0.8rem; color:var(--text-muted);">📍 ${uni.location}</p>
          <div style="margin:4px 0;">${generateStarRatingHTML(rating)}</div>
          <div style="font-size:0.75rem; margin-top:8px;"><strong>Fees:</strong> ${uni.feesRange}</div>
          <div style="margin-top:8px;">${recs}</div>
        </div>
      </div>`;
  }).join(''); }
function toggleLandingUniversities() {
  landingUnisExpanded = !landingUnisExpanded; D.get('toggle-unis-btn').innerHTML = landingUnisExpanded ? 'Show Less Universities ⬆️' : 'Show More Universities ⬇️'; renderLandingUniversities(); }
const openUniRequirementsModalByName = name => { const uni = appState.universities.find(u => u.name.toLowerCase().includes(name.toLowerCase())); if (uni) openUniRequirementsModal(uni.id); },
handleCheckCareerMatchClick = () => {
  closeUniRequirementsModal();
  if (!appState.user) { showToastNotification('Please sign in to access the Career Advisor!'); openAuthModal(); }
  else { navigateTo('portal-shell'); switchTab('student', 'student-career-guidance'); }
}, toggleMobileSidebar = () => document.querySelector('aside.portal-sidebar')?.classList.toggle('open'),
toggleLandingMenu = () => document.querySelector('.nav-links')?.classList.toggle('open'),
closeLandingMenu = () => document.querySelector('.nav-links')?.classList.remove('open');
function prepopulateUserSettings(role) {
  if (!appState.user) return; const isStd = role === 'student';
  D.val(`settings-${role}-name`, appState.user.name || '');
  D.val(`settings-${role}-username`, appState.user.username || '');
  if (isStd) {
    D.val('settings-student-dept', appState.user.department || ''); D.val('settings-student-idnum', appState.user.studentIdNumber || ''); D.get('settings-student-avatar-preview').src = appState.user.avatar || 'picture/avatar_student.jpg';
  } else {
    D.val('settings-lecturer-office', appState.user.office || ''); D.get('settings-lecturer-avatar-preview').src = appState.user.avatar || 'picture/avatar_lecturer.jpg'; } }
function saveUserSettings(role) {
  if (!appState.user) return; const isStd = role === 'student';
  appState.user.name = D.val(`settings-${role}-name`);
  appState.user.username = D.val(`settings-${role}-username`);
  if (isStd) { appState.user.department = D.val('settings-student-dept'); appState.user.studentIdNumber = D.val('settings-student-idnum'); } else appState.user.office = D.val('settings-lecturer-office'); const users = getSimulatedUsers(), idx = users.findIndex(u => u.email === appState.user.email);
  if (idx !== -1) { users[idx] = { ...users[idx], ...appState.user }; saveSimulatedUsers(users); }
  saveOfflineState(); updateSidebarDetails(); showToastNotification('Profile updated!'); }
function handleAvatarUpload(input, role) {
  if (input.files && input.files[0]) {
    const file = input.files[0]; if (file.size > 5 * 1024 * 1024) return alert("Image too large (Max 5MB)."); const reader = new FileReader();
    reader.onload = function(e) {
      const base64 = e.target.result; D.get(`settings-${role}-avatar-preview`).src = base64; appState.user.avatar = base64; const users = getSimulatedUsers(), idx = users.findIndex(u => u.email === appState.user.email);
      if (idx !== -1) { users[idx].avatar = base64; saveSimulatedUsers(users); }
      saveOfflineState(); updateSidebarDetails(); showToastNotification('Photo updated!');
    }; reader.readAsDataURL(file); } }
let inactivityTimer;
function resetInactivityTimer() {
  if (inactivityTimer) clearTimeout(inactivityTimer);
  if (appState.user) {
    inactivityTimer = setTimeout(() => {
      if (appState.user) { showToastNotification("Session timed out."); handlePrototypeLogout(); }
    }, 5 * 60 * 1000); } }
['mousemove', 'keydown', 'click'].forEach(evt => window.addEventListener(evt, resetInactivityTimer, { passive: true }));
function renderContactsDirectory() {
  const container = D.get('student-contacts-directory-list'); if (!container) return; const colors = ['var(--primary)', 'var(--secondary)', 'var(--accent)'];
  container.innerHTML = appState.facultyContacts.map((c, idx) => `
    <div class="timetable-item" style="border-left-color: ${colors[idx % colors.length]};">
      <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
        <div style="display:flex; align-items:center; gap:16px;">
          <div class="instructor-avatar" style="width:44px; height:44px; border-radius:50%; overflow:hidden;"><img src="picture/${c.avatar}" style="width:100%; height:100%; object-fit:cover;"></div>
          <div>
            <h4 style="font-size:0.95rem;">${c.name}</h4> <p style="font-size:0.8rem; color:var(--text-muted);">${c.role} • ${c.room} • ${c.email}</p>
            <span style="font-size:0.75rem; color:var(--success); font-weight:600;">Office Hours: ${c.hours}</span>
          </div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="startFacultyChat('${c.name}')">Message</button>
      </div>
    </div>`).join(''); }
function renderProgramSelectionCards() {
  const container = document.querySelector('#student-programs .course-grid'); if (!container) return;
  container.innerHTML = programCardsData.map(p => `
    <div class="course-card">
      <div class="course-banner" style="background:${p.bg};"><span class="course-code">${p.duration}</span><h3 style="font-size:1.1rem; margin-top:8px;">${p.title}</h3></div>
      <div class="course-body">
        <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:12px;">${p.desc}</p>
        <ul style="list-style:none; display:flex; flex-direction:column; gap:6px; font-size:0.8rem; color:var(--text-muted); margin-bottom:16px;">
          <li>💼 <strong>Top Careers:</strong> ${p.careers}</li> <li>📈 <strong>Ghana Job Demand:</strong> ${p.demand}</li> <li>💰 <strong>Avg Salary Range:</strong> ${p.salary}</li>
        </ul>
        <button class="btn btn-accent btn-sm" style="width:100%;" onclick="calculateProgramSuitability('${p.title}', ${p.suitability})">Check AI Suitability Score</button>
      </div>
    </div>`).join(''); }
function initApplication() {
  const theme = localStorage.getItem('smartlearn_theme') || 'light'; document.body.setAttribute('data-theme', theme); appState.theme = theme; document.querySelectorAll('.theme-toggle').forEach(btn => btn.innerHTML = theme === 'dark' ? '☀️' : '🌙'); fetchPublicUniversities(); loadAiProvider(); setAiMode('study'); renderGpaUniDropdown(); updateGpaPredictor(); renderStateData(); resetCareerQuiz(); resetInactivityTimer(); }
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initApplication); else initApplication();
function togglePasswordVisibility(inputId, btnEl) {
  const input = D.get(inputId); if (!input) return; const show = input.type === 'password'; input.type = show ? 'text' : 'password';
  btnEl.innerHTML = show ? `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="pointer-events: none;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>` : `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="pointer-events: none;"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`; }