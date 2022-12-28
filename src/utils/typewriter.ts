const TypeWriter = {
    write(text: string, speed: number = 60, done = () => {}) {
        process.stdout.write(text[0], () => {
            if (text.length > 1) setTimeout(() => this.write(text.slice(1)), speed);
            else done();
        });
    }
} 

export default TypeWriter;
