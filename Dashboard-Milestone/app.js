// Initialize Dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Generate milestone timelines
    generateTimeline('rnd');
    generateTimeline('pabrikasi');
    
    // Generate health cards for both divisions
    generateOKRCards('rnd');
    generateOKRCards('pabrikasi');
    
    // Generate WBS tracking for both divisions
    generateWBSTracking('rnd');
    generateWBSTracking('pabrikasi');
    
    console.log('OKR Dashboard loaded successfully!');
});
