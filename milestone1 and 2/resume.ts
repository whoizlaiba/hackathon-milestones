document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleSkills') as HTMLButtonElement;
    const skillsSection = document.getElementById('skillsSection') as HTMLDivElement;
  
    if (toggleButton && skillsSection) {
      toggleButton.addEventListener('click', () => {
        if (skillsSection.style.display === 'none' || skillsSection.style.display === '') {
          skillsSection.style.display = 'block';
          toggleButton.textContent = 'Hide Skills';
        } else {
          skillsSection.style.display = 'none';
          toggleButton.textContent = 'Show Skills';
        }
      });
    }
  });
  