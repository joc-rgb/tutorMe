import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';

interface IRichTextEditor{
  initialValue?:string
  setDesc: Function
}
export default function RichTextEditor(props:IRichTextEditor) {
  const editorRef =  useRef<TinyMCEEditor | null>(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      <Editor
        apiKey={`${process.env.NEXT_PUBLIC_TINYMCE_API_KEY}`}
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue={props.initialValue?props.initialValue:"<p>This is the initial content of the editor.</p>"}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        onChange={props.setDesc(editorRef.current?.getContent())}
    
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
}