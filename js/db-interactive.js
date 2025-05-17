/**
 * Interactive SQL Database Experience
 * This script provides a simulated database experience with CRUD operations
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('SQL Interactive script loaded');
  
  // Sample data - our fake database
  const databaseTables = {
    Users: [
      { UserID: 1, FirstName: 'أحمد', LastName: 'محمد', Email: 'ahmed@example.com', Password: 'password123' },
      { UserID: 2, FirstName: 'سارة', LastName: 'علي', Email: 'sara@example.com', Password: 'sara2022' },
      { UserID: 3, FirstName: 'محمد', LastName: 'عبدالله', Email: 'mohammed@example.com', Password: 'moh!pass' },
      { UserID: 4, FirstName: 'فاطمة', LastName: 'حسن', Email: 'fatima@example.com', Password: 'f@t1ma' },
      { UserID: 5, FirstName: 'علي', LastName: 'أحمد', Email: 'ali@example.com', Password: 'a11pass' }
    ],
    Products: [
      { ProductID: 1, ProductName: 'لابتوب', Price: 1200.00, Category: 'إلكترونيات', Stock: 10 },
      { ProductID: 2, ProductName: 'هاتف ذكي', Price: 800.00, Category: 'إلكترونيات', Stock: 15 },
      { ProductID: 3, ProductName: 'طاولة مكتب', Price: 250.00, Category: 'أثاث', Stock: 5 },
      { ProductID: 4, ProductName: 'كرسي مكتبي', Price: 150.00, Category: 'أثاث', Stock: 8 },
      { ProductID: 5, ProductName: 'سماعات لاسلكية', Price: 100.00, Category: 'إلكترونيات', Stock: 20 }
    ]
  };
  
  // Keep a working copy that we can modify
  let workingDatabase = JSON.parse(JSON.stringify(databaseTables));
  
  // Function to safely get DOM elements with better error handling
  function getElement(id) {
    const element = document.getElementById(id);
    if (!element) {
      console.warn(`Element with ID '${id}' not found in DOM`);
      return null;
    }
    return element;
  }
  
  // DOM Elements with improved error handling
  const sqlEditor = getElement('sqlEditor');
  const runQueryBtn = getElement('runQueryBtn');
  const clearEditorBtn = getElement('clearEditorBtn');
  const queryTemplate = getElement('queryTemplate');
  const queryResult = getElement('queryResult');
  const queryMessage = getElement('queryMessage');
  const toggleGuideBtn = getElement('toggleGuideBtn');
  const guideContent = getElement('guideContent');
  
  // Query templates
  const sqlTemplates = {
    'select-all': 'SELECT * FROM Users;',
    'select-where': 'SELECT FirstName, LastName, Email FROM Users WHERE UserID = 2;',
    'insert': 'INSERT INTO Users (FirstName, LastName, Email, Password) VALUES (\'ياسر\', \'حسين\', \'yasser@example.com\', \'yasser123\');',
    'update': 'UPDATE Users SET FirstName = \'خالد\' WHERE UserID = 3;',
    'delete': 'DELETE FROM Users WHERE UserID = 5;'
  };
  
  // Check if required elements exist before proceeding
  if (!sqlEditor || !runQueryBtn) {
    console.error('Critical SQL interactive elements not found. The feature may not work correctly.');
  } else {
    console.log('SQL Interactive elements found, initializing functionality');
    initializeSqlFeatures();
  }
  
  // Initialize all SQL features
  function initializeSqlFeatures() {
    // Set up template selector
    if (queryTemplate) {
      queryTemplate.addEventListener('change', function() {
        if (sqlEditor && this.value in sqlTemplates) {
          sqlEditor.value = sqlTemplates[this.value];
        }
      });
    }
    
    // Set up clear button
    if (clearEditorBtn && sqlEditor) {
      clearEditorBtn.addEventListener('click', function() {
        sqlEditor.value = '';
        sqlEditor.focus();
      });
    }
    
    // Set up guide toggle
    if (toggleGuideBtn && guideContent) {
      toggleGuideBtn.addEventListener('click', function() {
        guideContent.classList.toggle('collapsed');
        this.querySelector('i').classList.toggle('fa-chevron-up');
        this.querySelector('i').classList.toggle('fa-chevron-down');
      });
    }
    
    // Set up tab functionality
    setupGuideTabs();
    
    // Set up run query button
    if (runQueryBtn && sqlEditor) {
      runQueryBtn.addEventListener('click', function() {
        executeQuery(sqlEditor.value);
      });
      
      // Also allow executing with Ctrl+Enter
      sqlEditor.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
          executeQuery(sqlEditor.value);
        }
      });
    }
    
    // Initialize with default data
    displayInitialData();
  }
  
  // Set up tabs in the guide
  function setupGuideTabs() {
    const guideTabs = document.querySelectorAll('.guide-tab');
    
    if (guideTabs.length > 0) {
      guideTabs.forEach(tab => {
        tab.addEventListener('click', function() {
          const operation = this.getAttribute('data-operation');
          
          // Deactivate all tabs
          guideTabs.forEach(t => t.classList.remove('active'));
          
          // Activate the clicked tab
          this.classList.add('active');
          
          // Hide all tab panes
          document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
          });
          
          // Show the corresponding pane
          const targetPane = document.getElementById(`${operation}-guide`);
          if (targetPane) {
            targetPane.classList.add('active');
          } else {
            console.warn(`Tab pane #${operation}-guide not found`);
          }
        });
      });
    }
  }
  
  // Display initial data when the page loads
  function displayInitialData() {
    try {
      if (workingDatabase.Users && workingDatabase.Users.length > 0) {
        const defaultColumns = Object.keys(workingDatabase.Users[0]);
        displayResults(workingDatabase.Users, defaultColumns);
      }
    } catch (e) {
      console.error('Error displaying initial data:', e);
      if (queryResult) {
        queryResult.innerHTML = '<div class="error-message">Error loading database data. Please try refreshing the page.</div>';
      }
    }
  }
  
  // Execute an SQL query
  function executeQuery(queryText) {
    const query = queryText.trim();
    
    // Reset the database to original state for consistent results
    workingDatabase = JSON.parse(JSON.stringify(databaseTables));
    
    if (query.length === 0) {
      showError('الاستعلام فارغ. يرجى إدخال استعلام SQL.');
      return;
    }
    
    try {
      // Determine the query type
      const upperQuery = query.toUpperCase();
      
      if (upperQuery.startsWith('SELECT')) {
        handleSelect(query);
      } else if (upperQuery.startsWith('INSERT')) {
        handleInsert(query);
      } else if (upperQuery.startsWith('UPDATE')) {
        handleUpdate(query);
      } else if (upperQuery.startsWith('DELETE')) {
        handleDelete(query);
      } else {
        showError('نوع الاستعلام غير مدعوم. يرجى استخدام SELECT أو INSERT أو UPDATE أو DELETE.');
      }
    } catch (error) {
      showError(error.message || 'حدث خطأ أثناء تنفيذ الاستعلام.');
      console.error('SQL Execution Error:', error);
    }
  }
  
  // Handle SELECT queries
  function handleSelect(query) {
    // Very simplified SELECT parsing
    let tableName = '';
    let columns = [];
    let whereClause = null;
    
    // Extract table name
    const fromMatch = query.match(/FROM\s+(\w+)/i);
    if (fromMatch && fromMatch[1]) {
      tableName = fromMatch[1];
    } else {
      throw new Error('لم يتم العثور على اسم الجدول. تأكد من استخدام عبارة FROM.');
    }
    
    // Check if table exists
    if (!workingDatabase[tableName]) {
      throw new Error(`الجدول ${tableName} غير موجود.`);
    }
    
    // Extract columns
    const selectMatch = query.match(/SELECT\s+(.*?)\s+FROM/i);
    if (selectMatch && selectMatch[1]) {
      const columnStr = selectMatch[1].trim();
      if (columnStr === '*') {
        // Select all columns
        columns = Object.keys(workingDatabase[tableName][0]);
      } else {
        // Select specific columns
        columns = columnStr.split(',').map(col => col.trim());
      }
    }
    
    // Extract WHERE clause if it exists
    const whereMatch = query.match(/WHERE\s+(.*?)(?:;|$)/i);
    if (whereMatch && whereMatch[1]) {
      whereClause = whereMatch[1].trim();
    }
    
    // Filter data based on WHERE clause
    let result = [...workingDatabase[tableName]];
    
    if (whereClause) {
      // Very simplified WHERE clause parsing (supports only basic conditions)
      const conditionMatch = whereClause.match(/(\w+)\s*=\s*['"]?([\w@.]+)['"]?/i);
      
      if (conditionMatch) {
        const [, field, value] = conditionMatch;
        result = result.filter(row => {
          // Try to match as number if possible
          const numValue = !isNaN(value) ? Number(value) : value;
          return row[field] === numValue || row[field] === value;
        });
      }
    }
    
    // Project selected columns
    const projectedResult = result.map(row => {
      const newRow = {};
      columns.forEach(col => {
        newRow[col] = row[col];
      });
      return newRow;
    });
    
    // Display results
    displayResults(projectedResult, columns);
    showSuccess(`تم تنفيذ استعلام SELECT بنجاح. تم العثور على ${result.length} سجل.`);
  }
  
  // Handle INSERT queries
  function handleInsert(query) {
    // Very simplified INSERT parsing
    let tableName = '';
    let columns = [];
    let values = [];
    
    // Extract table name
    const insertMatch = query.match(/INSERT\s+INTO\s+(\w+)/i);
    if (insertMatch && insertMatch[1]) {
      tableName = insertMatch[1];
    } else {
      throw new Error('لم يتم العثور على اسم الجدول. تأكد من استخدام عبارة INSERT INTO.');
    }
    
    // Check if table exists
    if (!workingDatabase[tableName]) {
      throw new Error(`الجدول ${tableName} غير موجود.`);
    }
    
    // Extract columns
    const columnsMatch = query.match(/\(([^)]+)\)/);
    if (columnsMatch && columnsMatch[1]) {
      columns = columnsMatch[1].split(',').map(col => col.trim());
    }
    
    // Extract values
    const valuesMatch = query.match(/VALUES\s*\(([^)]+)\)/i);
    if (valuesMatch && valuesMatch[1]) {
      values = valuesMatch[1].split(',').map(val => {
        const trimmed = val.trim();
        // Remove quotes if it's a string
        if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
          return trimmed.substring(1, trimmed.length - 1);
        }
        return !isNaN(trimmed) ? Number(trimmed) : trimmed;
      });
    }
    
    if (columns.length !== values.length) {
      throw new Error('عدد الأعمدة وعدد القيم غير متطابق.');
    }
    
    // Create new row
    const newRow = {};
    
    // Generate auto-increment ID if needed
    if (!columns.includes('UserID') && tableName === 'Users') {
      const maxId = Math.max(...workingDatabase[tableName].map(row => row.UserID));
      newRow['UserID'] = maxId + 1;
    }
    
    if (!columns.includes('ProductID') && tableName === 'Products') {
      const maxId = Math.max(...workingDatabase[tableName].map(row => row.ProductID));
      newRow['ProductID'] = maxId + 1;
    }
    
    // Add column values
    columns.forEach((col, index) => {
      newRow[col] = values[index];
    });
    
    // Add any missing required columns with default values
    const requiredColumns = Object.keys(workingDatabase[tableName][0]);
    requiredColumns.forEach(col => {
      if (newRow[col] === undefined) {
        // Set default value based on column type
        switch (col) {
          case 'Stock':
            newRow[col] = 0;
            break;
          case 'Price':
            newRow[col] = 0.00;
            break;
          default:
            newRow[col] = '';
        }
      }
    });
    
    // Add the new row to the database
    workingDatabase[tableName].push(newRow);
    
    // Display updated results
    const allColumns = Object.keys(workingDatabase[tableName][0]);
    displayResults(workingDatabase[tableName], allColumns);
    showSuccess(`تم إدخال سجل جديد في الجدول ${tableName}.`);
  }
  
  // Handle UPDATE queries
  function handleUpdate(query) {
    // Very simplified UPDATE parsing
    let tableName = '';
    let setValues = {};
    let whereClause = null;
    
    // Extract table name
    const updateMatch = query.match(/UPDATE\s+(\w+)/i);
    if (updateMatch && updateMatch[1]) {
      tableName = updateMatch[1];
    } else {
      throw new Error('لم يتم العثور على اسم الجدول. تأكد من استخدام عبارة UPDATE.');
    }
    
    // Check if table exists
    if (!workingDatabase[tableName]) {
      throw new Error(`الجدول ${tableName} غير موجود.`);
    }
    
    // Extract SET values
    const setMatch = query.match(/SET\s+(.*?)(?:WHERE|;|$)/i);
    if (setMatch && setMatch[1]) {
      const setParts = setMatch[1].split(',');
      setParts.forEach(part => {
        const keyValue = part.split('=');
        if (keyValue.length === 2) {
          const key = keyValue[0].trim();
          let value = keyValue[1].trim();
          
          // Remove quotes if it's a string
          if (value.startsWith("'") && value.endsWith("'")) {
            value = value.substring(1, value.length - 1);
          } else if (!isNaN(value)) {
            value = Number(value);
          }
          
          setValues[key] = value;
        }
      });
    }
    
    // Extract WHERE clause if it exists
    const whereMatch = query.match(/WHERE\s+(.*?)(?:;|$)/i);
    if (whereMatch && whereMatch[1]) {
      whereClause = whereMatch[1].trim();
    }
    
    // Update data
    let updatedCount = 0;
    
    if (whereClause) {
      // Very simplified WHERE clause parsing
      const conditionMatch = whereClause.match(/(\w+)\s*=\s*['"]?([\w@.]+)['"]?/i);
      
      if (conditionMatch) {
        const [, field, value] = conditionMatch;
        const numValue = !isNaN(value) ? Number(value) : value;
        
        workingDatabase[tableName].forEach(row => {
          if (row[field] === numValue || row[field] === value) {
            // Update matching rows
            Object.keys(setValues).forEach(key => {
              row[key] = setValues[key];
            });
            updatedCount++;
          }
        });
      }
    } else {
      // Update all rows if no WHERE clause
      workingDatabase[tableName].forEach(row => {
        Object.keys(setValues).forEach(key => {
          row[key] = setValues[key];
        });
        updatedCount++;
      });
    }
    
    // Display updated results
    const allColumns = Object.keys(workingDatabase[tableName][0]);
    displayResults(workingDatabase[tableName], allColumns);
    showSuccess(`تم تحديث ${updatedCount} سجل في الجدول ${tableName}.`);
  }
  
  // Handle DELETE queries
  function handleDelete(query) {
    // Very simplified DELETE parsing
    let tableName = '';
    let whereClause = null;
    
    // Extract table name
    const deleteMatch = query.match(/DELETE\s+FROM\s+(\w+)/i);
    if (deleteMatch && deleteMatch[1]) {
      tableName = deleteMatch[1];
    } else {
      throw new Error('لم يتم العثور على اسم الجدول. تأكد من استخدام عبارة DELETE FROM.');
    }
    
    // Check if table exists
    if (!workingDatabase[tableName]) {
      throw new Error(`الجدول ${tableName} غير موجود.`);
    }
    
    // Extract WHERE clause if it exists
    const whereMatch = query.match(/WHERE\s+(.*?)(?:;|$)/i);
    if (whereMatch && whereMatch[1]) {
      whereClause = whereMatch[1].trim();
    }
    
    // Delete data
    const originalLength = workingDatabase[tableName].length;
    
    if (whereClause) {
      // Very simplified WHERE clause parsing
      const conditionMatch = whereClause.match(/(\w+)\s*=\s*['"]?([\w@.]+)['"]?/i);
      
      if (conditionMatch) {
        const [, field, value] = conditionMatch;
        const numValue = !isNaN(value) ? Number(value) : value;
        
        workingDatabase[tableName] = workingDatabase[tableName].filter(row => {
          return row[field] !== numValue && row[field] !== value;
        });
      }
    } else {
      // Delete all rows if no WHERE clause
      workingDatabase[tableName] = [];
    }
    
    const deletedCount = originalLength - workingDatabase[tableName].length;
    
    // Display updated results
    const allColumns = Object.keys(databaseTables[tableName][0]); // Use original db schema for columns
    displayResults(workingDatabase[tableName], allColumns);
    showSuccess(`تم حذف ${deletedCount} سجل من الجدول ${tableName}.`);
  }
  
  // Display results in the result area with improved error handling
  function displayResults(data, columns) {
    if (!queryResult) {
      console.error('Query result element not found');
      return;
    }
    
    try {
      // Generate HTML table
      let tableHtml = '<table class="results-table"><thead><tr>';
      
      // Table headers
      columns.forEach(col => {
        tableHtml += `<th>${col}</th>`;
      });
      
      tableHtml += '</tr></thead><tbody>';
      
      // Table rows
      if (!data || data.length === 0) {
        tableHtml += `<tr><td colspan="${columns.length}" style="text-align:center;">لا توجد نتائج</td></tr>`;
      } else {
        data.forEach(row => {
          tableHtml += '<tr>';
          columns.forEach(col => {
            // Mask password for security
            let value = row[col];
            if (col === 'Password' && value) {
              value = '••••••••';
            }
            // Handle null or undefined values
            value = (value === null || value === undefined) ? '' : value;
            tableHtml += `<td>${value}</td>`;
          });
          tableHtml += '</tr>';
        });
      }
      
      tableHtml += '</tbody></table>';
      
      // Update the result element
      queryResult.innerHTML = tableHtml;
    } catch (err) {
      console.error('Error displaying results:', err);
      queryResult.innerHTML = '<div class="error-message">Error displaying results. Please check console for details.</div>';
    }
  }
  
  // Show success message
  function showSuccess(message) {
    if (!queryMessage) return;
    
    queryMessage.className = 'query-message success-message';
    queryMessage.innerHTML = `<i class="fa fa-check-circle"></i> ${message}`;
    queryMessage.style.display = 'block';
  }
  
  // Show error message
  function showError(message) {
    if (!queryMessage) return;
    
    queryMessage.className = 'query-message error-message';
    queryMessage.innerHTML = `<i class="fa fa-exclamation-circle"></i> ${message}`;
    queryMessage.style.display = 'block';
  }
  
  // Initialize expand/collapse functionality for skills cards
  const expandBtns = document.querySelectorAll('.expand-btn');
  if (expandBtns) {
    expandBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const card = this.closest('.bento-card');
        if (card) {
          card.classList.toggle('expanded');
          
          // Toggle the icon
          const icon = this.querySelector('i');
          if (icon) {
            if (card.classList.contains('expanded')) {
              icon.className = 'fa fa-chevron-up';
            } else {
              icon.className = 'fa fa-chevron-down';
            }
          }
        }
      });
    });
  }
});
