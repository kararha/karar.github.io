var htmlEditor = ace.edit("html");
htmlEditor.setTheme("ace/theme/cobalt");
htmlEditor.session.setMode("ace/mode/html");
htmlEditor.resize();
htmlEditor.setHighlightActiveLine(false);
htmlEditor.session.setUseWrapMode(true);
htmlEditor.setOptions({
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  enableSnippets: true,
  showPrintMargin: false,
  fontSize: "14px"
});

var cssEditor = ace.edit("css");
cssEditor.setTheme("ace/theme/cobalt");
cssEditor.session.setMode("ace/mode/css");
cssEditor.resize();
cssEditor.setHighlightActiveLine(false);
cssEditor.session.setUseWrapMode(true);
cssEditor.setOptions({
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  enableSnippets: true,
  showPrintMargin: false,
  fontSize: "14px"
});

var jsEditor = ace.edit("js");
jsEditor.setTheme("ace/theme/cobalt");
jsEditor.session.setMode("ace/mode/javascript");
jsEditor.resize();
jsEditor.setHighlightActiveLine(false);
jsEditor.session.setUseWrapMode(true);
jsEditor.setOptions({
  enableBasicAutocompletion: true,
  enableLiveAutocompletion: true,
  enableSnippets: true,
  showPrintMargin: false,
  fontSize: "14px"
});

// Theme selection functionality
function changeEditorTheme(theme) {
  htmlEditor.setTheme(`ace/theme/${theme}`);
  cssEditor.setTheme(`ace/theme/${theme}`);
  jsEditor.setTheme(`ace/theme/${theme}`);
  
  // Save theme preference
  localStorage.setItem('editorTheme', theme);
}

// Load theme preference if available
function loadThemePreference() {
  const savedTheme = localStorage.getItem('editorTheme') || 'cobalt';
  changeEditorTheme(savedTheme);
  
  // Update theme selector if it exists
  const themeSelector = document.getElementById('theme-selector');
  if (themeSelector) {
    themeSelector.value = savedTheme;
  }
}

// Auto-save functionality
function saveToLocalStorage() {
  localStorage.setItem('savedHtml', htmlEditor.getValue());
  localStorage.setItem('savedCss', cssEditor.getValue());
  localStorage.setItem('savedJs', jsEditor.getValue());
  
  // Show save indicator
  showSaveIndicator();
  
  // Also save current layout and any file data
  if (isLayoutSplit) {
    localStorage.setItem('layoutSplit', 'true');
  } else {
    localStorage.setItem('layoutSplit', 'false');
  }
  
  // Save multiple files if available
  if (fileManager.files.length > 0) {
    localStorage.setItem('savedFiles', JSON.stringify(fileManager.files));
  }
}

// Load saved code if available
function loadFromLocalStorage() {
  if (localStorage.getItem('savedHtml')) {
    htmlEditor.setValue(localStorage.getItem('savedHtml'), -1);
  }
  if (localStorage.getItem('savedCss')) {
    cssEditor.setValue(localStorage.getItem('savedCss'), -1);
  }
  if (localStorage.getItem('savedJs')) {
    jsEditor.setValue(localStorage.getItem('savedJs'), -1);
  }
  
  // Load layout preference
  if (localStorage.getItem('layoutSplit') === 'true') {
    toggleSplitLayout(true);
  }
  
  // Load theme preference
  loadThemePreference();
  
  // Load any saved files
  if (localStorage.getItem('savedFiles')) {
    try {
      const savedFiles = JSON.parse(localStorage.getItem('savedFiles'));
      fileManager.loadSavedFiles(savedFiles);
    } catch (e) {
      console.error('Error loading saved files:', e);
    }
  }
}

// Show a temporary save indicator
function showSaveIndicator() {
  const saveIndicator = document.createElement('div');
  saveIndicator.textContent = 'تم الحفظ';
  saveIndicator.style.position = 'fixed';
  saveIndicator.style.bottom = '20px';
  saveIndicator.style.right = '20px';
  saveIndicator.style.padding = '10px 15px';
  saveIndicator.style.backgroundColor = 'rgba(40, 54, 24, 0.8)';
  saveIndicator.style.color = '#dda15e';
  saveIndicator.style.borderRadius = '4px';
  saveIndicator.style.zIndex = '1000';
  saveIndicator.style.opacity = '1';
  saveIndicator.style.transition = 'opacity 0.5s ease-in-out';
  
  document.body.appendChild(saveIndicator);
  
  setTimeout(() => {
    saveIndicator.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(saveIndicator);
    }, 500);
  }, 2000);
}

// Split layout functionality
let isLayoutSplit = false;

function toggleSplitLayout(forceState = null) {
  const ideContainer = document.getElementById('ide-container');
  const resultPanel = document.getElementById('result').parentElement;
  
  // Set state based on parameter or toggle current state
  if (forceState !== null) {
    isLayoutSplit = forceState;
  } else {
    isLayoutSplit = !isLayoutSplit;
  }
  
  if (isLayoutSplit) {
    // Split view - show both code and result
    ideContainer.classList.add('split-layout');
    document.getElementById('split-view-btn').innerHTML = '<i class="fa fa-columns"></i> عرض عادي';
    // Make sure result panel is visible
    resultPanel.style.display = 'block';
    
    // Resize editors to adjust to new layout
    htmlEditor.resize();
    cssEditor.resize();
    jsEditor.resize();
  } else {
    // Regular view - show one panel at a time
    ideContainer.classList.remove('split-layout');
    document.getElementById('split-view-btn').innerHTML = '<i class="fa fa-columns"></i> عرض مقسم';
    
    // Hide result panel if not currently active
    if (document.querySelector('#button-wrapper button:nth-child(4)').style.background !== "#002240") {
      resultPanel.style.display = 'none';
    }
    
    // Resize editors to adjust to new layout
    htmlEditor.resize();
    cssEditor.resize();
    jsEditor.resize();
  }
}

// Fullscreen mode for result preview
function toggleResultFullscreen() {
  const resultFrame = document.getElementById('result');
  
  if (!document.fullscreenElement) {
    if (resultFrame.requestFullscreen) {
      resultFrame.requestFullscreen();
    } else if (resultFrame.mozRequestFullScreen) { // Firefox
      resultFrame.mozRequestFullScreen();
    } else if (resultFrame.webkitRequestFullscreen) { // Chrome, Safari and Opera
      resultFrame.webkitRequestFullscreen();
    } else if (resultFrame.msRequestFullscreen) { // IE/Edge
      resultFrame.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}

// File download functionality
function downloadCode() {
  // Create a zip file with HTML, CSS, and JS
  const zip = new JSZip();
  zip.file('index.html', createCompleteHTML());
  zip.file('style.css', cssEditor.getValue());
  zip.file('script.js', jsEditor.getValue());
  
  zip.generateAsync({type: 'blob'}).then(function(content) {
    // Create a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(content);
    downloadLink.download = 'project.zip';
    
    // Trigger download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  });
}

// Create complete HTML document for download
function createCompleteHTML() {
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>مشروعي</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
${htmlEditor.getValue()}
  <script src="script.js"></script>
</body>
</html>`;
}

// Toggle keyboard shortcuts panel
function toggleKeyboardShortcuts() {
  const shortcutsPanel = document.getElementById('keyboard-shortcuts');
  
  if (shortcutsPanel.style.display === 'none' || !shortcutsPanel.style.display) {
    shortcutsPanel.style.display = 'block';
  } else {
    shortcutsPanel.style.display = 'none';
  }
}

// File manager for multiple files
const fileManager = {
  files: [],
  currentFile: null,
  
  createNewFile: function(type) {
    const extension = type === 'html' ? 'html' : type === 'css' ? 'css' : 'js';
    const fileName = `file${this.files.length + 1}.${extension}`;
    
    const newFile = {
      id: Date.now(),
      name: fileName,
      type: type,
      content: ''
    };
    
    this.files.push(newFile);
    this.switchToFile(newFile.id);
    this.updateFileList();
    return newFile;
  },
  
  switchToFile: function(fileId) {
    // Save current content before switching
    if (this.currentFile) {
      const currentEditor = this.getEditorByType(this.currentFile.type);
      this.currentFile.content = currentEditor.getValue();
    }
    
    // Find and load the selected file
    const file = this.files.find(f => f.id === fileId);
    if (file) {
      this.currentFile = file;
      
      // Switch to the appropriate panel
      if (file.type === 'html') {
        switchPanel(0);
      } else if (file.type === 'css') {
        switchPanel(1);
      } else if (file.type === 'js') {
        switchPanel(2);
      }
      
      // Load content to editor
      const editor = this.getEditorByType(file.type);
      editor.setValue(file.content, -1);
    }
  },
  
  getEditorByType: function(type) {
    if (type === 'html') return htmlEditor;
    if (type === 'css') return cssEditor;
    if (type === 'js') return jsEditor;
    return null;
  },
  
  updateFileList: function() {
    const filesList = document.getElementById('files-list');
    if (!filesList) return;
    
    // Clear the list
    filesList.innerHTML = '';
    
    // Create simple icon view for HTML, CSS, and JS
    const fileTypes = ['html', 'css', 'js'];
    const fileIcons = ['html5', 'css3-alt', 'js'];
    
    fileTypes.forEach((type, index) => {
      const fileItem = document.createElement('div');
      fileItem.className = 'file-item';
      
      // Use appropriate icon for each file type
      fileItem.innerHTML = `<i class="fab fa-${fileIcons[index]}"></i><span>${type.toUpperCase()}</span>`;
      
      // Add click handler to switch to the appropriate panel
      fileItem.addEventListener('click', () => {
        switchPanel(index);
      });
      
      filesList.appendChild(fileItem);
    });
    
    // Highlight the active panel
    const activeIndex = document.querySelector('#button-wrapper button[style*="background: rgb(0, 34, 64)"]');
    if (activeIndex) {
      const index = Array.from(document.querySelectorAll('#button-wrapper button')).indexOf(activeIndex);
      if (index >= 0 && index < 3) {
        const fileItems = filesList.querySelectorAll('.file-item');
        fileItems[index].classList.add('active');
      }
    }
  },
  
  deleteFile: function(fileId) {
    const index = this.files.findIndex(f => f.id === fileId);
    
    if (index !== -1) {
      this.files.splice(index, 1);
      
      // If we deleted the current file, switch to another one
      if (this.currentFile && this.currentFile.id === fileId) {
        this.currentFile = null;
        if (this.files.length > 0) {
          this.switchToFile(this.files[0].id);
        } else {
          // No more files, create default ones
          htmlEditor.setValue('');
          cssEditor.setValue('');
          jsEditor.setValue('');
        }
      }
      
      this.updateFileList();
    }
  },
  
  loadSavedFiles: function(savedFiles) {
    this.files = savedFiles;
    this.updateFileList();
    
    // Load the first file of each type
    const htmlFile = savedFiles.find(f => f.type === 'html');
    const cssFile = savedFiles.find(f => f.type === 'css');
    const jsFile = savedFiles.find(f => f.type === 'js');
    
    if (htmlFile) htmlEditor.setValue(htmlFile.content, -1);
    if (cssFile) cssEditor.setValue(cssFile.content, -1);
    if (jsFile) jsEditor.setValue(jsFile.content, -1);
    
    // Set current file
    if (savedFiles.length > 0) {
      this.currentFile = savedFiles[0];
    }
  }
};

function compiler() {
  try {
    var htmlValue = htmlEditor.getValue();
    var cssValue = cssEditor.getValue();
    var jsValue = jsEditor.getValue();
    var result = document.getElementById("result").contentWindow.document;

    // Create a complete HTML document with proper structure
    const fullHtml = `
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>معاينة</title>
        <style>
          /* CSS Reset */
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          /* User CSS */
          ${cssValue}
        </style>
      </head>
      <body>
        ${htmlValue}
        <script>
          // Error handling wrapper
          try {
            ${jsValue}
          } catch(e) {
            console.error('JavaScript Error:', e.message);
            const errorElement = document.createElement('div');
            errorElement.style.position = 'fixed';
            errorElement.style.bottom = '0';
            errorElement.style.left = '0';
            errorElement.style.right = '0';
            errorElement.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
            errorElement.style.color = 'white';
            errorElement.style.padding = '10px';
            errorElement.style.fontSize = '14px';
            errorElement.style.fontFamily = 'monospace';
            errorElement.textContent = 'JavaScript Error: ' + e.message;
            document.body.appendChild(errorElement);
          }
        </script>
      </body>
      </html>
    `;

    result.open();
    result.write(fullHtml);
    result.close();
    
    // Save after successful compilation
    saveToLocalStorage();
  } catch (error) {
    console.error("Compilation Error:", error);
    const result = document.getElementById("result").contentWindow.document;
    result.open();
    result.write(`
      <html>
        <body style="background-color: #ffecec; color: #ff0000; padding: 20px; font-family: Arial, sans-serif;">
          <h2>خطأ في التنفيذ:</h2>
          <pre>${error.message}</pre>
        </body>
      </html>
    `);
    result.close();
  }
}

var allButtons = document.querySelectorAll("#button-wrapper button");
var allPanels = document.querySelectorAll("#ide-container .panel-wrapper");

function switchPanel(panelIndex) {
  switcher(panelIndex);
}

// Initialize with HTML panel and auto-compile the code
document.addEventListener('DOMContentLoaded', function() {
  loadFromLocalStorage();
  switchPanel(0);
  compiler();
  
  // Update file list on initial load
  fileManager.updateFileList();
  
  // Add a MutationObserver to detect when panel switch happens
  const buttonWrapper = document.getElementById('button-wrapper');
  const observer = new MutationObserver(() => {
    fileManager.updateFileList();
  });
  
  observer.observe(buttonWrapper, { 
    attributes: true, 
    attributeFilter: ['style'],
    subtree: true
  });
});

function runEdit(panelIndex) {
  switcher(panelIndex);
  compiler();
}

function switcher(panelIndex) {
  allButtons.forEach(function (node) {
    node.style.background = "";
  });
  allButtons[panelIndex].style.background = "#002240";
  allPanels.forEach(function (node) {
    node.style.display = "none";
  });
  allPanels[panelIndex].style.display = "block";
}

// Add debounce function for better performance
function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

// Add event listeners to the editors with debouncing
const debouncedCompiler = debounce(compiler, 300);
htmlEditor.session.on('change', debouncedCompiler);
cssEditor.session.on('change', debouncedCompiler);
jsEditor.session.on('change', debouncedCompiler);

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
  // Ctrl+S or Cmd+S to save and run
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    compiler();
  }
  
  // Ctrl+1 for HTML panel
  if ((e.ctrlKey || e.metaKey) && e.key === '1') {
    e.preventDefault();
    switchPanel(0);
  }
  
  // Ctrl+2 for CSS panel
  if ((e.ctrlKey || e.metaKey) && e.key === '2') {
    e.preventDefault();
    switchPanel(1);
  }
  
  // Ctrl+3 for JS panel
  if ((e.ctrlKey || e.metaKey) && e.key === '3') {
    e.preventDefault();
    switchPanel(2);
  }
  
  // Ctrl+4 for result panel
  if ((e.ctrlKey || e.metaKey) && e.key === '4') {
    e.preventDefault();
    runEdit(3);
  }
  
  // Ctrl+Alt+S to toggle split view
  if ((e.ctrlKey || e.metaKey) && e.altKey && e.key === 's') {
    e.preventDefault();
    toggleSplitLayout();
  }
  
  // F11 for fullscreen result
  if (e.key === 'F11' && document.activeElement === document.getElementById('result')) {
    e.preventDefault();
    toggleResultFullscreen();
  }
  
  // Ctrl+Alt+K to show keyboard shortcuts
  if ((e.ctrlKey || e.metaKey) && e.altKey && e.key === 'k') {
    e.preventDefault();
    toggleKeyboardShortcuts();
  }
});
