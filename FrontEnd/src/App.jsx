import { useState } from 'react';
import 'prismjs/themes/prism-tomorrow.css';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import Editor from 'react-simple-code-editor';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import axios from 'axios';
import './App.css';

function App() {
  const [code, setCode] = useState(`// Enter your JavaScript code here`);
  const [status, setStatus] = useState('Ready to review');
  const [review, setReview] = useState('');

  async function reviewCode() {
    setStatus('Reviewing...');
    try {
      const response = await axios.post('http://localhost:8080/ai/get-review', { code });
      setReview(response.data);
      setStatus('Review complete');
    } catch (err) {
      console.error('Error fetching review:', err);
      setReview('Error fetching review.');
      setStatus('Error fetching review');
    }
  }

  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
            padding={10}
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 16,
              backgroundColor: '#000',
              color: 'white',
              // border: '1px solid #444',
              borderRadius: '5px',
              height: '100%',
              width: '100%',
              overflowY: 'auto',
            }}
          />
        </div>
        <div onClick={reviewCode} className="review-button">
          Review
        </div>
        <div className="status">{status}</div>
      </div>
      <div className="right">
        <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
      </div>
    </main>
  );
}

export default App;