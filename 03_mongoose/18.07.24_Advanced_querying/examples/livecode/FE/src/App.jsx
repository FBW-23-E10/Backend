import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [comments, setComments] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [numberOfPages, setNumBerOfPages] = useState(0);
  const [limit, setLimit] = useState(comments.length);

  const getComments = async () => {
    const { data } = await axios.get(
      `http://localhost:3000/comments?page=${currentPage}&limit=${limit}`
      //`http://localhost:3000/comments?page=${currentPage}&limit=5`
    );

    setCurrentPage(data.pagination.currentPage);
    setNumBerOfPages(data.pagination.numberOfPages);
    setComments(data.comments);
  };

  useEffect(() => {
    getComments();
  }, [currentPage, limit]);

  const changeCurrentPage = (e) => {
    const direction = e.target.innerText;

    /* if (currentPage === 0 && direction === 'prev') setCurrentPage(currentPage); */
    if (currentPage > 0 && direction === 'prev')
      setCurrentPage((currentPage) => currentPage - 1);
    if (direction === 'next') setCurrentPage((currentPage) => currentPage + 1);
  };
  
  console.log(currentPage + 1);
  console.log(numberOfPages);
  return (
    <>
      <h1>Comments</h1>
      <div>
        <label htmlFor='limit'>sort</label>
        <select
          type='text'
          name='limit'
          id='limit'
          value={limit}
          onChange={sorting}
        >
          <option value='user'>user</option>
          <option value='comment_ascending'>comment_ascending</option>
          <option value='comment_descending'>comment_descending</option>
        </select>
      </div>
      <div>
        <label htmlFor='limit'>Set limit per page</label>
        <input
          type='text'
          name='limit'
          id='limit'
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        />
      </div>

      <button
        disabled={currentPage === 0}
        className='directionButton'
        onClick={changeCurrentPage}
      >
        prev
      </button>
      <button
        disabled={currentPage + 1 >= numberOfPages}
        //disabled={currentPage+1 === totalCommentCount / comments.length}
        className='directionButton'
        onClick={changeCurrentPage}
      >
        next
      </button>
      <div>
        {comments.map((comment) => (
          <div key={comment._id} className='commentCard'>
            <p className='comment'>{comment.content}</p>
            <p className='user'>{comment.user.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
