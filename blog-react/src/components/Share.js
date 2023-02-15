import React, { useState } from 'react';
import { FiShare2 } from 'react-icons/fi';
import copy from 'clipboard-copy';

const ShareDocument = ({ documentUrl }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShareClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleCopyLink = () => {
    copy(documentUrl);
    // Track copy event with analytics library here
  };

  return (
    <div>
      <button onClick={handleShareClick}>
        <FiShare2 />
      </button>
      {showModal && (
        <div>
          <h2>Share Document</h2>
          <p>Copy the link below to share the document:</p>
          <input type="text" value={documentUrl} readOnly />
          <button onClick={handleCopyLink}>Copy Link</button>
          <button onClick={handleModalClose}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ShareDocument;
