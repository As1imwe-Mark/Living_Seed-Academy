import { useEffect, useState } from 'react';
import client from '../../client';

const Resources = () => {
  const [documents, setDocuments] = useState([]);
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    const fetchDocumentsAndFolders = async () => {
      try {
        const documentsQuery = '*[_type == "documentUpload"]{title, "url": file.asset->url}';
        const foldersQuery = '*[_type == "folder"]{title, "urls": files[].asset->url}';

        const documentsData = await client.fetch(documentsQuery);
        const foldersData = await client.fetch(foldersQuery);

        setDocuments(documentsData);
        setFolders(foldersData);
      } catch (error) {
        console.error('Error fetching documents and folders:', error);
      }
    };

    fetchDocumentsAndFolders();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 p-text">Study Resources</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 p-text">Revision Test and Homework</h2>
        <ul className="list-disc list-inside">
          {documents.map((doc, index) => (
            <li key={index}>
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                download={doc.title}
                className="text-blue-600 hover:underline"
              >
                {doc.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2 p-text">Notes And Past Paper</h2>
        {folders.map((folder, index) => (
          <div key={index} className="mb-4 border p-4">
            <h3 className="text-lg font-medium mb-2">{folder.title}</h3>
            <ul>
              {folder.urls.map((url, i) => (
                <li key={i}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download={`${folder.title}-${i}`}
                    className="text-blue-600 hover:underline block"
                  >
                    {`File ${i + 1}`}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
