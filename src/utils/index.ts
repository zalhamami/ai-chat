const Utils = {
    sleep(ms: number): Promise<void> {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
    }
}

export default Utils;
