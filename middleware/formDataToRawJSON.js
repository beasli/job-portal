const formidable = require('formidable');

const formDataToRawJSON = (req, res, next) => {
  // Check if the request contains form data
  if (req.headers['content-type'] && req.headers['content-type'].startsWith('multipart/form-data')) {
    // Initialize formidable to parse the form data
    const form = new formidable.IncomingForm({ multiples: true });


    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({ error: 'Invalid form data' });
      }
      console.log(fields)
       // Convert the form data fields to raw JSON
       req.body = normalizeFormData(fields);
       req.files = files;
      next();
    });
  } else {
    next();
  }
};

// Helper function to normalize form data fields
const normalizeFormData = (fields) => {
    const normalizedFields = {};
  
    // Iterate through the form data fields
    for (const [key, value] of Object.entries(fields)) {
      if (Array.isArray(value) && value.length === 1) {
        // If the value is an array with a single element, extract that element
        normalizedFields[key] = value[0];
      } else {
        const fieldName = key.endsWith('[]') ? key.slice(0, -2) : key;
        normalizedFields[fieldName] = value;
      }
    }
  
    return normalizedFields;
  };

module.exports = formDataToRawJSON;
