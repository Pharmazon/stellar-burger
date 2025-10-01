const Quote = (props) => {
    return (
        <div className="fancy-quote">
            <p className='text'>{props.children}</p>
            <span className='author'>{props.author}</span>
        </div>
    );
}


const DuneQuote = () => {
    return (
        <Quote
            author="Принцесса Ирулан «Избранные&nbsp;изречения Муад'Диба»">
            Арракис учит «пониманию ножа», учит относиться к жизни так: отрезать всё несовершенное и незавершённое, говоря: «Вот теперь это совершенно и завершено — ибо кончается здесь».
        </Quote>
    );
}

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<DuneQuote />);