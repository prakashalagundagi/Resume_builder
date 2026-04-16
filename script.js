/**
 * Resume Builder Application
 * Traditional Resume Format with Modern UI
 * 
 * This application allows users to create professional resumes
 * in traditional format with live preview and PDF export.
 */

// Global data structure to store all resume information
let resumeData = {
    // Personal information section
    personal: {
        fullName: '',        // User's full name
        role: '',            // Professional role/title
        email: '',           // Email address
        phone: '',           // Phone number
        address: '',         // Physical address
        linkedin: '',        // LinkedIn profile URL
        fatherName: '',      // Father's name
        dob: '',             // Date of birth
        gender: '',          // Gender
        languages: '',       // Languages known
        nationality: '',     // Nationality
        maritalStatus: ''   // Marital status
    },
    careerObjective: '',   // Career objective statement
    education: [],         // Array of education entries
    skills: [],           // Array of skills
    experience: [],        // Array of work experiences
    declaration: {         // Declaration section
        text: '',          // Declaration text
        date: '',          // Declaration date
        place: ''          // Declaration place
    }
};

/**
 * Application Initialization
 * Called when DOM is fully loaded
 * Sets up all components and initializes the application state
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();      // Create animated background particles
    initializeTabs();          // Set up tab navigation
    initializePersonalInfo();  // Set up form field listeners
    loadFromLocalStorage();    // Restore saved data
    updatePreview();           // Update resume preview
    addMicroInteractions();    // Add UI effects and animations
});

/**
 * Creates animated floating particles for background effect
 * Generates 50 particles with random positions and animation delays
 */
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;  // Number of particles to generate
    
    // Create each particle with random properties
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random horizontal position (0-100%)
        particle.style.left = Math.random() * 100 + '%';
        
        // Random animation delay (0-20 seconds)
        particle.style.animationDelay = Math.random() * 20 + 's';
        
        // Random animation duration (15-25 seconds)
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

/**
 * Adds micro-interactions and UI effects
 * Includes ripple effects on buttons and hover states on form inputs
 */
function addMicroInteractions() {
    // Add Material Design ripple effect to all buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            // Style the ripple element
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            // Ensure button can contain the ripple
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            // Remove ripple after animation completes
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add subtle scale effect on form input focus
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            // Scale up parent element on focus
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            // Reset scale on blur
            this.parentElement.style.transform = 'scale(1)';
        });
    });
}

/**
 * Initializes tab navigation functionality
 * Handles switching between different form sections
 */
function initializeTabs() {
    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.tab-panel');
    
    // Add click event listener to each tab
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            
            // Remove active class from all tabs and panels
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            tab.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

/**
 * Initializes event listeners for all personal information form fields
 * Updates data, preview, and localStorage on input changes
 */
function initializePersonalInfo() {
    // Array of all personal information field IDs
    const personalFields = [
        'fullName', 'role', 'email', 'phone', 'address', 'linkedin',
        'fatherName', 'dob', 'gender', 'languages', 'nationality', 'maritalStatus'
    ];
    
    // Add input listeners to each personal field
    personalFields.forEach(field => {
        const element = document.getElementById(field);
        if (element) {
            element.addEventListener('input', (e) => {
                // Update data structure
                resumeData.personal[field] = e.target.value;
                // Update live preview
                updatePreview();
                // Save to localStorage for persistence
                saveToLocalStorage();
            });
        }
    });
    
    // Career objective field handler
    const careerObjectiveElement = document.getElementById('careerObjective');
    if (careerObjectiveElement) {
        careerObjectiveElement.addEventListener('input', (e) => {
            resumeData.careerObjective = e.target.value;
            updatePreview();
            saveToLocalStorage();
        });
    }
    
    // Declaration section handlers
    const declarationElement = document.getElementById('declaration');
    const dateElement = document.getElementById('date');
    const placeElement = document.getElementById('place');
    
    // Declaration text handler
    if (declarationElement) {
        declarationElement.addEventListener('input', (e) => {
            resumeData.declaration.text = e.target.value;
            updatePreview();
            saveToLocalStorage();
        });
    }
    
    // Declaration date handler
    if (dateElement) {
        dateElement.addEventListener('input', (e) => {
            resumeData.declaration.date = e.target.value;
            updatePreview();
            saveToLocalStorage();
        });
    }
    
    // Declaration place handler
    if (placeElement) {
        placeElement.addEventListener('input', (e) => {
            resumeData.declaration.place = e.target.value;
            updatePreview();
            saveToLocalStorage();
        });
    }
}

/**
 * Adds a new education entry form to the education section
 * Creates form fields for degree, institution, year, and CGPA
 */
function addEducation() {
    const educationList = document.getElementById('educationList');
    const educationItem = document.createElement('div');
    educationItem.className = 'education-item';
    
    // Create education form HTML
    educationItem.innerHTML = `
        <div class="form-group">
            <label>Degree</label>
            <input type="text" class="edu-degree" placeholder="B.Tech Computer Engineering">
        </div>
        <div class="form-group">
            <label>Institution</label>
            <input type="text" class="edu-institution" placeholder="University Name">
        </div>
        <div class="form-group">
            <label>Year</label>
            <input type="text" class="edu-year" placeholder="2018-2022">
        </div>
        <div class="form-group">
            <label>CGPA/Grade</label>
            <input type="text" class="edu-cgpa" placeholder="8.5 CGPA">
        </div>
        <button class="remove-btn" onclick="removeEducation(this)">Remove</button>
    `;
    
    // Add the new education item to the list
    educationList.appendChild(educationItem);
    
    // Add input event listeners to all new form fields
    educationItem.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', updateEducationData);
    });
    
    // Update the education data structure
    updateEducationData();
}

/**
 * Removes an education entry from the form
 * @param {HTMLElement} button - The remove button that was clicked
 */
function removeEducation(button) {
    // Remove the parent education item
    button.parentElement.remove();
    // Update the education data
    updateEducationData();
}

/**
 * Updates the education data structure from all education form entries
 * Clears and rebuilds the education array with current form data
 */
function updateEducationData() {
    // Clear existing education data
    resumeData.education = [];
    const educationItems = document.querySelectorAll('.education-item');
    
    // Process each education item
    educationItems.forEach(item => {
        const degree = item.querySelector('.edu-degree').value;
        const institution = item.querySelector('.edu-institution').value;
        const year = item.querySelector('.edu-year').value;
        const cgpa = item.querySelector('.edu-cgpa').value;
        
        // Only add if at least one field has content
        if (degree || institution || year) {
            resumeData.education.push({ degree, institution, year, cgpa });
        }
    });
    
    // Update preview and save data
    updatePreview();
    saveToLocalStorage();
}

/**
 * Adds a new skill to the skills list
 * Validates input and prevents duplicates
 */
function addSkill() {
    const skillInput = document.getElementById('skillInput');
    const skill = skillInput.value.trim();
    
    // Only add if skill is not empty and not already in list
    if (skill && !resumeData.skills.includes(skill)) {
        resumeData.skills.push(skill);
        skillInput.value = '';  // Clear input field
        updateSkillsDisplay();
        updatePreview();
        saveToLocalStorage();
    }
}

/**
 * Removes a skill from the skills list
 * @param {string} skill - The skill to remove
 */
function removeSkill(skill) {
    // Filter out the skill to be removed
    resumeData.skills = resumeData.skills.filter(s => s !== skill);
    updateSkillsDisplay();
    updatePreview();
    saveToLocalStorage();
}

/**
 * Updates the skills display in the form
 * Creates skill tags with remove buttons
 */
function updateSkillsDisplay() {
    const skillsList = document.getElementById('skillsList');
    skillsList.innerHTML = '';
    
    // Create a tag for each skill
    resumeData.skills.forEach(skill => {
        const skillTag = document.createElement('div');
        skillTag.className = 'skill-tag';
        skillTag.innerHTML = `
            ${skill}
            <span class="remove-skill" onclick="removeSkill('${skill}')">×</span>
        `;
        skillsList.appendChild(skillTag);
    });
}

/**
 * Adds a new work experience entry form
 * Creates form fields for job title, company, duration, and description
 */
function addExperience() {
    const experienceList = document.getElementById('experienceList');
    const experienceItem = document.createElement('div');
    experienceItem.className = 'experience-item';
    
    // Create experience form HTML
    experienceItem.innerHTML = `
        <div class="form-group">
            <label>Job Title</label>
            <input type="text" class="exp-title" placeholder="Software Developer">
        </div>
        <div class="form-group">
            <label>Company</label>
            <input type="text" class="exp-company" placeholder="Company Name">
        </div>
        <div class="form-group">
            <label>Duration</label>
            <input type="text" class="exp-duration" placeholder="2022-2023">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea class="exp-description" placeholder="Describe your responsibilities and achievements"></textarea>
        </div>
        <button class="remove-btn" onclick="removeExperience(this)">Remove</button>
    `;
    
    // Add the new experience item to the list
    experienceList.appendChild(experienceItem);
    
    // Add input event listeners to all new form fields
    experienceItem.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', updateExperienceData);
    });
    
    // Update the experience data structure
    updateExperienceData();
}

/**
 * Removes a work experience entry from the form
 * @param {HTMLElement} button - The remove button that was clicked
 */
function removeExperience(button) {
    // Remove the parent experience item
    button.parentElement.remove();
    // Update the experience data
    updateExperienceData();
}

/**
 * Updates the experience data structure from all experience form entries
 * Clears and rebuilds the experience array with current form data
 */
function updateExperienceData() {
    // Clear existing experience data
    resumeData.experience = [];
    const experienceItems = document.querySelectorAll('.experience-item');
    
    // Process each experience item
    experienceItems.forEach(item => {
        const title = item.querySelector('.exp-title').value;
        const company = item.querySelector('.exp-company').value;
        const duration = item.querySelector('.exp-duration').value;
        const description = item.querySelector('.exp-description').value;
        
        // Only add if at least title or company has content
        if (title || company) {
            resumeData.experience.push({ title, company, duration, description });
        }
    });
    
    // Update preview and save data
    updatePreview();
    saveToLocalStorage();
}

/**
 * Adds a new project entry form
 * Creates form fields for project name and description
 * Note: Projects section is not used in traditional resume format but kept for flexibility
 */
function addProject() {
    const projectsList = document.getElementById('projectsList');
    const projectItem = document.createElement('div');
    projectItem.className = 'project-item';
    
    // Create project form HTML
    projectItem.innerHTML = `
        <div class="form-group">
            <label>Project Name</label>
            <input type="text" class="proj-name" placeholder="Project Name">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea class="proj-description" placeholder="Describe your project"></textarea>
        </div>
        <button class="remove-btn" onclick="removeProject(this)">Remove</button>
    `;
    
    // Add the new project item to the list
    projectsList.appendChild(projectItem);
    
    // Add input event listeners to all new form fields
    projectItem.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', updateProjectsData);
    });
    
    // Update the projects data structure
    updateProjectsData();
}

/**
 * Removes a project entry from the form
 * @param {HTMLElement} button - The remove button that was clicked
 */
function removeProject(button) {
    // Remove the parent project item
    button.parentElement.remove();
    // Update the projects data
    updateProjectsData();
}

/**
 * Updates the projects data structure from all project form entries
 * Clears and rebuilds the projects array with current form data
 */
function updateProjectsData() {
    // Clear existing projects data
    resumeData.projects = [];
    const projectItems = document.querySelectorAll('.project-item');
    
    // Process each project item
    projectItems.forEach(item => {
        const name = item.querySelector('.proj-name').value;
        const description = item.querySelector('.proj-description').value;
        
        // Only add if project name has content
        if (name) {
            resumeData.projects.push({ name, description });
        }
    });
    
    // Update preview and save data
    updatePreview();
    saveToLocalStorage();
}

/**
 * Updates the live resume preview with current data
 * Populates all sections of the traditional resume format
 */
function updatePreview() {
    // Update personal information section
    document.getElementById('preview-name').textContent = resumeData.personal.fullName || 'Your Name';
    document.getElementById('preview-address').textContent = resumeData.personal.address || 'Your Address';
    document.getElementById('preview-phone').textContent = 'Mob No. : ' + (resumeData.personal.phone || '+1234567890');
    document.getElementById('preview-email').textContent = 'Email Id : ' + (resumeData.personal.email || 'your.email@example.com');
    
    // Update career objective section
    document.getElementById('preview-career-objective').textContent = 
        resumeData.careerObjective || 'To make contribution in organization with best of my ability and also to Develop new skills during interaction to achieve new heights.';
    
    // Update academic qualification table
    const educationTableBody = document.querySelector('.education-table-body');
    educationTableBody.innerHTML = '';
    resumeData.education.forEach((edu, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${edu.degree || '-'}</td>
            <td>${edu.institution || '-'}</td>
            <td>${edu.year || '-'}</td>
            <td>${edu.cgpa || '-'}</td>
        `;
        educationTableBody.appendChild(row);
    });
    
    // Update other qualification (skills) section
    const skillsList = document.querySelector('.skills-list');
    skillsList.innerHTML = '';
    resumeData.skills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        skillsList.appendChild(li);
    });
    
    // Update work experience section
    if (resumeData.experience.length > 0) {
        const workContent = document.querySelector('.work-experience-content');
        workContent.innerHTML = '';
        resumeData.experience.forEach(exp => {
            const div = document.createElement('div');
            div.innerHTML = `
                <p><strong>${exp.title}</strong> | ${exp.company}</p>
                <p class="duration">${exp.duration}</p>
                <p>${exp.description}</p>
            `;
            workContent.appendChild(div);
        });
    }
    
    // Update personal information section
    document.getElementById('preview-father-name').textContent = resumeData.personal.fatherName || '-';
    document.getElementById('preview-dob').textContent = resumeData.personal.dob || '-';
    document.getElementById('preview-languages').textContent = resumeData.personal.languages || 'English, Kannada';
    document.getElementById('preview-gender').textContent = resumeData.personal.gender || '-';
    document.getElementById('preview-nationality').textContent = resumeData.personal.nationality || 'Indian';
    document.getElementById('preview-marital-status').textContent = resumeData.personal.maritalStatus || 'Single';
    
    // Update declaration section
    document.getElementById('preview-declaration-text').textContent = 
        resumeData.declaration.text || 'I hereby declare that information furnished above is true to the best of my knowledge.';
    document.getElementById('preview-date').textContent = resumeData.declaration.date || '-';
    document.getElementById('preview-place').textContent = resumeData.declaration.place || '-';
    document.getElementById('preview-signature-name').textContent = resumeData.personal.fullName || 'Your Name';
    
    // Hide empty sections for cleaner preview
    document.getElementById('preview-education').style.display = resumeData.education.length ? 'block' : 'none';
    document.getElementById('preview-skills').style.display = resumeData.skills.length ? 'block' : 'none';
    document.getElementById('preview-experience').style.display = resumeData.experience.length ? 'block' : 'none';
    document.getElementById('preview-objective').style.display = resumeData.careerObjective ? 'block' : 'none';
    document.getElementById('preview-declaration').style.display = resumeData.declaration.text ? 'block' : 'none';
}

/**
 * Downloads the resume as a PDF file
 * Uses html2pdf library to convert the resume preview to PDF
 * Shows loading state and handles success/error feedback
 */
function downloadResume() {
    const downloadBtn = document.querySelector('.download-btn');
    const originalText = downloadBtn.textContent;
    
    // Show loading state on button
    downloadBtn.innerHTML = '<span class="loading"></span> Generating...';
    downloadBtn.disabled = true;
    
    // Get the resume preview element
    const element = document.getElementById('resumePreview');
    
    // 🔥 GET NAME DYNAMICALLY (ADDED)
    const rawName = resumeData.personal.fullName || "Resume";
    const name = rawName.replace(/[^a-z0-9]/gi, "_");

    console.log(name);
    // PDF generation options
    const opt = {
        margin: 10,                                    
        filename: `${name} Resume.pdf`,   // ✅ FIXED HERE
        image: { type: 'jpeg', quality: 0.98 },       
        html2canvas: { scale: 2 },                    
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }  
    };
    
    // Generate and download PDF
    html2pdf().set(opt).from(element).save().then(() => {
        // Reset button state on success
        downloadBtn.textContent = originalText;
        downloadBtn.disabled = false;
        
        // Show success notification
        showToast('Resume downloaded successfully!');
        
        // Add success animation to button
        downloadBtn.classList.add('success');
        setTimeout(() => downloadBtn.classList.remove('success'), 500);
    }).catch(error => {
        // Reset button state on error
        downloadBtn.textContent = originalText;
        downloadBtn.disabled = false;
        console.error('Error generating PDF:', error);
        showToast('Error generating PDF. Please try again.', 'error');
    });
}
/**
 * Shows a toast notification for user feedback
 * @param {string} message - The message to display
 * @param {string} type - Type of notification ('success' or 'error')
 */
function showToast(message, type = 'success') {
    // Remove any existing toast to prevent duplicates
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create new toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    // Set background color based on type
    if (type === 'error') {
        toast.style.background = 'var(--error)';
    }
    
    toast.textContent = message;
    
    // Add to DOM
    document.body.appendChild(toast);
    
    // Trigger slide-in animation
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);  // Wait for animation to complete
    }, 3000);
}

/**
 * Saves the current resume data to browser localStorage
 * Provides data persistence across browser sessions
 */
function saveToLocalStorage() {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
}

/**
 * Loads resume data from localStorage and populates the form
 * Restores all form fields and data structures from saved data
 */
function loadFromLocalStorage() {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
        // Parse saved data
        resumeData = JSON.parse(savedData);
        
        // Load personal information fields
        Object.keys(resumeData.personal).forEach(field => {
            const element = document.getElementById(field);
            if (element && resumeData.personal[field]) {
                element.value = resumeData.personal[field];
            }
        });
        
        // Load career objective
        const careerObjectiveElement = document.getElementById('careerObjective');
        if (careerObjectiveElement && resumeData.careerObjective) {
            careerObjectiveElement.value = resumeData.careerObjective;
        }
        
        // Load education entries
        if (resumeData.education.length > 0) {
            const educationList = document.getElementById('educationList');
            educationList.innerHTML = '';
            resumeData.education.forEach(edu => {
                addEducation();
                const lastItem = educationList.lastElementChild;
                lastItem.querySelector('.edu-degree').value = edu.degree;
                lastItem.querySelector('.edu-institution').value = edu.institution;
                lastItem.querySelector('.edu-year').value = edu.year;
                lastItem.querySelector('.edu-cgpa').value = edu.cgpa;
            });
        }
        
        // Load skills display
        updateSkillsDisplay();
        
        // Load work experience entries
        if (resumeData.experience.length > 0) {
            const experienceList = document.getElementById('experienceList');
            experienceList.innerHTML = '';
            resumeData.experience.forEach(exp => {
                addExperience();
                const lastItem = experienceList.lastElementChild;
                lastItem.querySelector('.exp-title').value = exp.title;
                lastItem.querySelector('.exp-company').value = exp.company;
                lastItem.querySelector('.exp-duration').value = exp.duration;
                lastItem.querySelector('.exp-description').value = exp.description;
            });
        }
        
        // Load declaration section
        const declarationElement = document.getElementById('declaration');
        const dateElement = document.getElementById('date');
        const placeElement = document.getElementById('place');
        
        if (declarationElement && resumeData.declaration.text) {
            declarationElement.value = resumeData.declaration.text;
        }
        
        if (dateElement && resumeData.declaration.date) {
            dateElement.value = resumeData.declaration.date;
        }
        
        if (placeElement && resumeData.declaration.place) {
            placeElement.value = resumeData.declaration.place;
        }
    }
}

/**
 * Additional event listeners setup
 * Runs after DOM is loaded to set up initial form field listeners
 */
document.addEventListener('DOMContentLoaded', function() {
    // Add input listeners to initial education form fields
    document.querySelectorAll('.education-item input').forEach(input => {
        input.addEventListener('input', updateEducationData);
    });
    
    // Add input listeners to initial experience form fields
    document.querySelectorAll('.experience-item input, .experience-item textarea').forEach(input => {
        input.addEventListener('input', updateExperienceData);
    });
    
    // Add input listeners to initial project form fields
    document.querySelectorAll('.project-item input, .project-item textarea').forEach(input => {
        input.addEventListener('input', updateProjectsData);
    });
    
    // Add keyboard support for skill input (Enter key to add skill)
    document.getElementById('skillInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addSkill();
        }
    });
});
