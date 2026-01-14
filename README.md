# MD. Alamin Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS, showcasing the skills and projects of MD. Alamin, a MERN stack developer.

## Features

- **Modern Design**: Glass morphism effects with animated backgrounds
- **Responsive Layout**: Optimized for all device sizes
- **Interactive Components**: Smooth animations and hover effects
- **MERN Stack Focus**: Highlighting MongoDB, Express, React, and Node.js expertise
- **Project Showcase**: Detailed project cards with live demos and source code links
- **Skills Visualization**: Progress bars and technology icons
- **Contact Form**: Interactive contact form with validation
- **Professional Timeline**: Educational and professional journey display

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Build Tool**: Vite
- **Icons**: Lucide React, React Icons
- **Animations**: CSS animations and transitions

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd kiro
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   ├── Background.tsx   # Animated background
│   ├── Navigation.tsx   # Navigation bar
│   ├── HeroSection.tsx  # Hero/landing section
│   ├── AboutSection.tsx # About section
│   ├── ServicesSection.tsx # Services offered
│   ├── SkillsSection.tsx   # Skills and tools
│   ├── ProjectsSection.tsx # Project showcase
│   ├── JourneySection.tsx  # Timeline
│   ├── TestimonialsSection.tsx # Client testimonials
│   ├── ContactSection.tsx  # Contact form
│   └── Footer.tsx       # Footer
├── lib/
│   └── utils.ts         # Utility functions
├── App.tsx              # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## Key Components

### Background
- Animated blob shapes with organic movement
- CSS animations for smooth transitions

### Navigation
- Fixed navigation with glass morphism effect
- Responsive design with mobile menu

### Hero Section
- Animated status indicator
- Gradient text effects
- Floating technology badges

### Skills Section
- Progress bars for skill levels
- Technology icon grid
- Interactive hover effects

### Projects Section
- Alternating layout for visual interest
- Technology tags
- Links to live demos and source code

### Contact Form
- Form validation
- Glass morphism styling
- Interactive submit button

## Customization

### Colors
The primary color scheme uses cyan (#00ddff) as the main accent color. To change this:

1. Update the `primary` color in `tailwind.config.js`
2. Update CSS custom properties in `src/index.css`

### Content
Update the content in each component file to reflect your own information:

- Personal information in `HeroSection.tsx` and `AboutSection.tsx`
- Skills and technologies in `SkillsSection.tsx`
- Projects in `ProjectsSection.tsx`
- Timeline events in `JourneySection.tsx`
- Testimonials in `TestimonialsSection.tsx`

### Styling
- Modify Tailwind classes in component files
- Add custom CSS in `src/index.css`
- Update shadcn/ui component styles in `src/components/ui/`

## Performance Optimizations

- Lazy loading for images
- Optimized bundle size with Vite
- Efficient CSS with Tailwind's purging
- Minimal JavaScript for animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

MD. Alamin - [2213081052@uttarauniversity.edu.bd](mailto:2213081052@uttarauniversity.edu.bd)

Project Link: [GitHub Repository](https://github.com/ALA22min22)