const TypeWriter = {
    write: function write(text, speed = 60, done = () => {}) {
        process.stdout.write(text[0], () => {
            if (text.length > 1) setTimeout(() => write(text.slice(1)), speed);
            else done();
        });
    }
} 

export default TypeWriter;
