import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Files = () => {
  const router = useRouter();
  const { page } = router.query;
  const [files, setFiles] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/files?page=${page}`);
      setFiles(response.data.files);
      setTotalPages(response.data.totalPages);
    };

    fetchData();
  }, [page]);

  const handleDownload = (file) => {
    // download the file using the file's URL
  };

  const renderFiles = () => {
    return files.map((file) => (
      <div key={file.id}>
        <a href={file.url} onClick={() => handleDownload(file)}>
          Download
        </a>
        {file.name}
      </div>
    ));
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <a key={i} href={`/files?page=${i}`}>
          {i}
        </a>
      );
    }
    return pages;
  };

  return (
    <div>
      {renderFiles()}
      <div>{renderPagination()}</div>
    </div>
  );
};

export default Files;
