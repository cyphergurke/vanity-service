export const paragraphs = (text: string) => {
    return text.split('\n').map((line, index) => (
        line.trim() === '' ? <br key={index} /> : <p className="text-white" key={index}>{line}</p>
    ));
}