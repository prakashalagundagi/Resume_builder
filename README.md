# Resume Builder

A professional resume builder web application that helps you create beautiful, professional resumes in minutes. Built with pure HTML, CSS, and JavaScript - no frameworks required!

## Features

- **Live Preview**: See your resume update in real-time as you type
- **PDF Export**: Download your resume as a PDF file
- **Local Storage**: Your data is automatically saved locally
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with smooth animations
- **Multiple Sections**: Add personal info, education, skills, experience, and projects

## Sections

1. **Personal Information**: Name, role, contact details, LinkedIn profile
2. **Education**: Add multiple education entries with degree, institution, year, and CGPA
3. **Skills**: Add and remove skills with tag-based interface
4. **Work Experience**: Add multiple work experiences with descriptions
5. **Projects**: Showcase your projects with descriptions

## How to Use

1. **Fill in your information** in the left panel
2. **See live preview** on the right side
3. **Download as PDF** when you're satisfied with your resume
4. **Data is saved automatically** in your browser's local storage

## Local Development

To run this project locally:

```bash
# Clone the repository
git clone https://github.com/prakashalagundagi/Resume_builder.git
cd Resume_builder

# Start a local server
python -m http.server 8000
# or use Node.js
npx serve .

# Open in browser
# Navigate to http://localhost:8000
```

## GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages:

1. **Push your changes** to the main branch
2. **Run the deploy command**:
   ```bash
   npm install
   npm run deploy
   ```
3. **Your site will be live** at: `https://prakashalagundagi.github.io/Resume_builder`

### Automatic Deployment Setup

For automatic deployment on every push:

1. Go to your GitHub repository settings
2. Navigate to "Pages" in the sidebar
3. Under "Build and deployment", set source to "Deploy from a branch"
4. Select the main branch and folder `/root`
5. Click "Save"

## File Structure

```
Resume_builder/
|-- index.html          # Main HTML file
|-- styles.css          # Styling and responsive design
|-- script.js           # JavaScript functionality
|-- package.json        # Project configuration
|-- README.md          # This file
|-- .gitignore         # Git ignore rules
```

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Modern JavaScript features
- **html2pdf.js**: PDF generation library
- **Google Fonts**: Inter font family
- **LocalStorage API**: Data persistence

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Created by **Prakash Alagundagi**

---

**Note**: This resume builder is designed to be simple, fast, and effective. No complex setup required - just open the HTML file and start building your resume!
