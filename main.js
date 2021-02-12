function Book(title, author, numPages, readNotRead) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.readNotRead = readNotRead;
    this.info = () => {
        return `${title} by ${author}, ${numPages} pages, ${readNotRead}`;
    }
}
