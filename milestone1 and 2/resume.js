document.addEventListener('DOMContentLoaded', function () {
    var toggleButton = document.getElementById('toggleSkills');
    var skillsSection = document.getElementById('skillsSection');
    if (toggleButton && skillsSection) {
        toggleButton.addEventListener('click', function () {
            if (skillsSection.style.display === 'none' || skillsSection.style.display === '') {
                skillsSection.style.display = 'block';
                toggleButton.textContent = 'Hide Skills';
            }
            else {
                skillsSection.style.display = 'none';
                toggleButton.textContent = 'Show Skills';
            }
        });
    }
});
