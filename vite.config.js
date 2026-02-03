import { defineConfig } from 'vite';
import fs from 'fs';

import path from 'path';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                portfolio: resolve(__dirname, 'portfolio.html'),
                project: resolve(__dirname, 'project.html')
                // admin.html is INTENTIONALLY EXCLUDED so it is not built/deployed
            }
        }
    },
    plugins: [
        {
            name: 'save-content-middleware',
            configureServer(server) {
                server.middlewares.use('/api/save-content', (req, res, next) => {
                    if (req.method === 'POST') {
                        let body = '';
                        req.on('data', chunk => {
                            body += chunk.toString();
                        });
                        req.on('end', () => {
                            try {
                                // Validate JSON
                                console.log('Received save request');
                                const data = JSON.parse(body);
                                const filePath = path.resolve(__dirname, 'src/data/content.json');

                                // Write to file
                                fs.writeFileSync(filePath, JSON.stringify(data, null, 4));

                                console.log('Successfully saved content.json');
                                res.statusCode = 200;
                                res.end(JSON.stringify({ success: true, message: 'Saved successfully' }));
                            } catch (err) {
                                console.error('Error saving content.json:', err);
                                res.statusCode = 500;
                                res.end(JSON.stringify({ success: false, message: 'Error saving file', error: err.toString() }));
                            }
                        });
                    } else {
                        next();
                    }
                });

                // Image Upload Middleware
                server.middlewares.use('/api/upload-image', (req, res, next) => {
                    if (req.method === 'POST') {
                        let body = '';
                        req.on('data', chunk => {
                            body += chunk.toString();
                        });
                        req.on('end', () => {
                            try {
                                const data = JSON.parse(body);
                                // Expects { image: "base64string...", filename: "optional.jpg" }

                                if (!data.image) throw new Error('No image data');

                                const base64Data = data.image.replace(/^data:image\/\w+;base64,/, "");
                                const buffer = Buffer.from(base64Data, 'base64');

                                const uploadsDir = path.resolve(__dirname, 'public/uploads');
                                if (!fs.existsSync(uploadsDir)) {
                                    fs.mkdirSync(uploadsDir, { recursive: true });
                                }

                                const filename = `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.jpg`;
                                fs.writeFileSync(path.join(uploadsDir, filename), buffer);

                                // Return format for Editor.js Image Tool
                                // { success: 1, file: { url: "..." } }
                                res.statusCode = 200;
                                res.end(JSON.stringify({
                                    success: 1,
                                    file: {
                                        url: `/uploads/${filename}`
                                    }
                                }));
                                console.log('Image uploaded:', filename);

                            } catch (err) {
                                console.error('Upload Error:', err);
                                res.statusCode = 500;
                                res.end(JSON.stringify({ success: 0, message: err.message }));
                            }
                        });
                    } else {
                        next();
                    }
                });
            }
        }
    ]
});
