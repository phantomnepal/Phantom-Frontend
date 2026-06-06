import type { SiteContent } from '../types';

export const hardcodedContent: SiteContent = {
  navItems: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    {
      label: 'Product',
      dropdown: [
        { label: 'Embedded Systems', href: '/product/features' },
        { label: 'IOT & Robotics', href: '/product/pricing' },
        { label: 'UAV', href: '/product/changelog' },
        { label: 'Educational Kits', href: '/product/educational-kits' },
      ],
    },
    {
      label: 'Engineering',
      dropdown: [
        { label: 'Embedded Hardware Development', href: '/engineering/blog' },
        { label: 'Embedded Software Development', href: '/engineering/oss' },
        { label: '3D & Mechanical Development', href: '/engineering/docs' },
      ],
    },
    { label: 'Projects', href: '/projects' },
  ],

  searchableItems: [
    { title: 'Home', href: '/', category: 'Page' },
    { title: 'About Us', href: '/about', category: 'Page' },
    { title: 'Features', href: '/product/features', category: 'Product' },
    { title: 'Pricing', href: '/product/pricing', category: 'Product' },
    { title: 'Changelog', href: '/product/changelog', category: 'Product' },
    { title: 'Blog', href: '/engineering/blog', category: 'Engineering' },
    { title: 'Open Source', href: '/engineering/oss', category: 'Engineering' },
    { title: 'API Docs', href: '/engineering/docs', category: 'Engineering' },
    { title: 'Projects', href: '/projects', category: 'Page' },
    { title: 'Contact Us', href: '/contact', category: 'Page' },
  ],

  footerQuickLinks: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Product', href: '/product' },
    { label: 'Engineering', href: '/engineering' },
    { label: 'Project', href: '/projects' },
    { label: 'Contact', href: '/contact' },
  ],

  footerEngineeringLinks: [
    { label: 'Embedded Hardware Development', href: '#' },
    { label: 'Embedded Software Development', href: '#' },
    { label: '3D & Mechanical Development', href: '#' },
  ],

  footerProductLinks: [
    { label: 'Embedded Systems', href: '#' },
    { label: 'IOT & Robotics', href: '#' },
    { label: 'UAV', href: '#' },
    { label: 'Educational Kits', href: '#' },
  ],

  solutions: [
    {
      layer: 'CORE LAYER',
      title: 'Embedded Systems',
      description:
        'We design and build complete embedded systems from schematics and PCB design to firmware and integration delivering production-ready solutions.',
      tags: ['Project Specific', 'Reliable', 'Industrial Grade'],
      iconName: 'Cpu',
    },
    {
      layer: 'PLATFORM LAYER',
      title: 'IoT & Robotics Engineering',
      description:
        'We build intelligent connected systems combining hardware, sensors, and mechanical design to deliver autonomous and remote-ready solutions.',
      tags: ['Project Specific', 'Reliable', 'Industrial Grade'],
      iconName: 'Layers',
    },
    {
      layer: 'SYSTEM LAYER',
      title: 'UAV System Development',
      description:
        'We engineer unmanned aerial systems by integrating aerodynamics, avionics, propulsion, and communication systems.',
      tags: ['Project Specific', 'Reliable', 'Industrial Grade'],
      iconName: 'Rocket',
    },
  ],

  capabilities: [
    {
      category: 'ENGINEERING CAPABILITIES',
      title: 'Embedded Hardware Development',
      subtitle: 'Hardware Development Lifecycle',
      features: [
        'Requirements & System Architecture',
        'Component Selection & Schematic Design',
        'Multi-layer PCB Layout',
        'Power, Signal & Thermal Integrity',
        'EMI/EMC Design Considerations',
        'Prototyping & Hardware Bring-up',
        'Testing, Validation & Debugging',
        'Optimisation & Production Readiness',
      ],
      image: '/hardware2.png',
    },
    {
      category: 'ENGINEERING CAPABILITIES',
      title: 'Embedded Software Development',
      subtitle: 'Software Development Lifecycle',
      features: [
        'Requirements & System Architecture',
        'Bare-metal / RTOS Firmware Development',
        'Peripheral & Driver Development',
        'Communication Protocols',
        'Real-Time Control Systems',
        'Testing, Debugging & Validation',
        'Performance & Power Optimisation',
        'Deployment & Field Updates',
      ],
      image: '/software.jpg',
    },
    {
      category: 'ENGINEERING CAPABILITIES',
      title: '3D Design & Mechanical Development',
      subtitle: 'Mechanical Development Lifecycle',
      features: [
        'Requirements & Form Factor Definition',
        'Concept Design & CAD Modelling',
        'Structural Design & Material Selection',
        'Load, Stress & Vibration Considerations',
        'Thermal & Environmental Design',
        'Enclosure & Mounting Design',
        'Testing & Design Iteration',
        'Production-Ready Design',
      ],
      image: '/mechanical.jpg',
    },
  ],

  products: [
    {
      category: 'Instrumentation',
      title: 'Embedded Systems',
      image: '/embedded-systems.jpg',
      href: '/products/embedded-systems',
    },
    {
      category: 'Aerospace',
      title: 'Engineering Kits',
      image: '/engineering-kits.png',
      href: '/products/engineering-kits',
    },
    {
      category: 'Development',
      title: 'IoT & Robotics',
      image: '/iot-robotics.jpg',
      href: '/products/iot-robotics',
    },
  ],

  logos: [
    { src: '/logos/matlab.svg', alt: 'MATLAB' },
    { src: '/logos/LT.svg', alt: 'LTspice' },
    { src: '/logos/aws-freertos.svg', alt: 'FreeRTOS' },
    { src: '/logos/blender.svg', alt: 'Blender' },
    { src: '/logos/Altium.png', alt: 'Altium Designer' },
    { src: '/logos/platformio.svg', alt: 'PlatformIO' },
    { src: '/logos/visual-studio-code.svg', alt: 'VS Code' },
    { src: '/logos/arduino.svg', alt: 'Arduino' },
    { src: '/logos/OpenVSP.png', alt: 'OpenVSP' },
    { src: '/logos/kicad.svg', alt: 'KiCad' },
    { src: '/logos/fusion.svg', alt: 'Fusion' },
    { src: '/logos/stmicroelectronics.svg', alt: 'STM32CubeIDE' },
  ],

  faqLeft: [
    {
      value: 'item-1',
      question: 'What is Phantom?',
      answer:
        'Phantom is an engineering-focused company developing embedded systems, robotics, IoT platforms, UAV technologies, and educational electronics products designed for real-world applications.',
    },
    {
      value: 'item-2',
      question: 'What products does Phantom offer?',
      answer: null,
      list: [
        'Electronics starter kits',
        'Embedded systems kits',
        'Robotics and IoT learning kits',
        'UAV and flight controller development projects',
      ],
    },
    {
      value: 'item-3',
      question: 'Who are Phantom products designed for?',
      answer: null,
      list: [
        'Students and beginners',
        'STEM learners',
        'Engineering enthusiasts',
        'Educational institutions',
        'Developers and hobby makers',
      ],
    },
    {
      value: 'item-4',
      question: 'Why are Phantom kits different from typical electronics kits?',
      answer:
        'Instead of including excessive unused components, Phantom focuses on carefully selected, practical components that are widely used in real-world electronics, embedded systems, robotics, and IoT projects.',
    },
    {
      value: 'item-5',
      question: 'Do I need prior experience to use the kits?',
      answer:
        'No. Our starter kits are designed to be beginner-friendly while still being expandable for advanced learning and future projects.',
    },
  ],

  faqRight: [
    {
      value: 'item-1',
      question: 'What can I build using the Phantom Electronics Starter Kit?',
      answer: null,
      list: [
        'LED control systems',
        'Sensor-based automation',
        'LCD display systems',
        'Motion detection alarms',
        'Servo control projects',
        'Basic smart automation systems',
      ],
    },
    {
      value: 'item-2',
      question: 'Does Phantom provide tutorials or documentation?',
      answer:
        'Yes. We provide project documentation, example codes, circuit references, and learning resources to help users build and understand projects effectively.',
    },
    {
      value: 'item-3',
      question: 'Are Phantom products future-proof?',
      answer:
        'Yes. We focus on components and platforms that are commonly used across embedded systems, robotics, IoT, and automation projects, allowing users to continue expanding beyond beginner-level learning.',
    },
    {
      value: 'item-4',
      question: 'Do you deliver all over Nepal?',
      answer:
        'Yes. Phantom products are available with nationwide delivery across Nepal.',
    },
    {
      value: 'item-5',
      question: 'Can institutions or schools collaborate with Phantom?',
      answer:
        'Absolutely. We are open to educational collaborations, workshops, training programs, and project-based partnerships with schools, colleges, and organizations.',
    },
  ],

  projects: [
    {
      id: 1,
      image: '/projects/project1.jpg',
      category: 'AEROSPACE EDUCATION',
      badge: 'PROTOTYPE',
      badgeVariant: 'prototype',
      title: 'Educational 1U CubeSat',
      description:
        'A learning platform designed to introduce students to satellite systems, embedded electronics, communications, and aerospace engineering principles.',
      tags: ['Aerospace', 'CubeSat', 'Education'],
    },
    {
      id: 2,
      image: '/projects/project2.jpg',
      category: 'FPV FLIGHT CONTROLLER ',
      badge: 'IN DEVELOPMENT',
      badgeVariant: 'in-development',
      title: 'Phantom F722 Flight Controller',
      description:
        'A custom STM32F722-based flight controller designed for high-end FPV drones and industrial UAV applications requiring millisecond precision.',
      tags: ['FPV', 'Flight Control', 'Avionics'],
    },
    {
      id: 3,
      image: '/projects/project1.jpg',
      category: 'FPV FLIGHT CONTROLLER ',
      badge: 'PROTOTYPE',
      badgeVariant: 'prototype',
      title: 'Phantom F405 Flight Controller',
      description:
        'A STM32F405-based flight controller designed for high-end FPV drones and industrial UAV applications requiring millisecond precision',
      tags: ['FPV', 'Flight Control', 'Avionics'],
    },
    {
      id: 4,
      image: '/projects/project3.jpg',
      category: 'Educational Products',
      badge: 'AVAILABLE',
      badgeVariant: 'available',
      title: 'Phantom Electronics Starter Kit',
      description:
        'A beginner-friendly electronics kit designed to teach fundamental concepts through hands-on projects involving sensors, displays, and basic automation systems.',
      tags: ['Electronics', 'STEM Education', 'Beginners'],
    },
    {
      id: 5,
      image: '/projects/project4.jpg',
      category: 'Educational Products',
      badge: 'AVAILABLE',
      badgeVariant: 'available',
      title: 'Phantom Robotics Kit',
      description:
        'Explore robotics through practical projects involving motion control, sensors, actuators, and autonomous system development.',
      tags: ['Robotics', 'Automation', 'Motion Control'],
    },
    {
      id: 6,
      image: '/projects/project5.jpg',
      category: 'Educational Products',
      badge: 'IN DEVELOPMENT',
      badgeVariant: 'in-development',
      title: 'Phantom Embedded Systems Kit',
      description:
        'Learn real embedded systems development with industry-relevant hardware and programming concepts, including communication protocols, peripherals, and real-time control.',
      tags: ['Embedded Systems', 'STEM Education'],
    },
  ],

  coreValues: [
    {
      number: '01',
      title: 'Disciplined Design',
      description:
        'We follow rigorous engineering standards to ensure every PCB and firmware module is deterministic and reliable.',
    },
    {
      number: '02',
      title: 'Local Innovation',
      description:
        'By building advanced systems in Nepal, we aim to inspire and empower the next generation of hardware engineers.',
    },
    {
      number: '03',
      title: 'Mission Focused',
      description:
        "Whether it's a simple sensor node or a complex CubeSat, we design with the end-mission success as our primary metric.",
    },
  ],

  roadmap: [
    {
      year: '2026',
      phase: 'CURRENT PHASE',
      title: 'Foundation & Product Launch',
      description:
        'Building a strong foundation through educational platforms, embedded systems kits, and initial product releases. Focused on developing reliable hardware, validating designs, and establishing Phantom as a trusted engineering brand in Nepal.',
      isCurrent: true,
    },
    {
      year: '2028',
      phase: '',
      title: 'Industrial Autonomy',
      description:
        'Scaling edge-computing solutions for sovereign manufacturing hubs.',
      isCurrent: false,
    },
    {
      year: '2029',
      phase: '',
      title: 'Avionics Integration',
      description:
        'Certification for safety-critical flight systems and data links.',
      isCurrent: false,
    },
    {
      year: '2030',
      phase: '',
      title: 'Aerospace Grade',
      description:
        'Deep space telemetry modules for private lunar infrastructure.',
      isCurrent: false,
    },
  ],

  contactInfo: [
    {
      iconName: 'Mail',
      label: 'Email',
      value: 'info@phantom.com.np',
      href: 'mailto:info@phantom.com.np',
    },
    {
      iconName: 'Phone',
      label: 'Phone',
      value: '+977 (986)3942274',
      href: 'tel:+9779863942274',
    },
    {
      iconName: 'MapPin',
      label: 'Location',
      value: 'Kathmandu, Nepal',
      href: 'https://maps.app.goo.gl/MC1qoKfJvkrohWAd6',
    },
  ],

  socialLinks: [
    {
      iconName: 'FaTiktok',
      href: 'https://www.tiktok.com/@phantom_technology02?is_from_webapp=1&sender_device=pc',
      label: 'Tiktok',
    },
    {
      iconName: 'FaLinkedinIn',
      href: 'https://www.linkedin.com/company/phantom_technologies/',
      label: 'LinkedIn',
    },
    {
      iconName: 'FaInstagram',
      href: 'https://www.instagram.com/phantom.nepal?igsh=MTN5aGg2YmpwNDJhZg==',
      label: 'Instagram',
    },
  ],

  heroImages: [{ src: '/images/hero1.png' }, { src: '/images/hero2.png' }],
};
