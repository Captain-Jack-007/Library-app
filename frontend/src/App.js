import './App.css';
import BookFilter from './components/BookFilter/BookFilter';
import BookForm from './components/BookForm/BookForm';
import BookList from './components/BookList/BookList';
import Error from './components/Errors/error';
function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Book library</h1>
      </header>
      <main className="app-main">
        <div className="app-left-column">
          <BookForm />
        </div>
        <div className="app-right-column">
          <BookFilter />
          <BookList />
        </div>
      </main>
      <Error />
    </div>
  );
}

export default App;
