const Progress = require('../../scripts/fetch-progress/progress.js')

/**** USO: */
// postData(
//     PARAM_1,
//     PARAM_2,
//     {
//         onProgress: (progreso) => {
//             console.log(progreso)
//         }
//     }
// )

module.exports = (response, params = { onProgress }) => {
    const defaultSize = 0
    const emitDelay = 10
    const onComplete = () => null
    const onError = () => null

    const { body, headers, status } = response;
    const contentLength = headers.get('content-length') || defaultSize;

    const progress = new Progress(contentLength, emitDelay);
    const reader = body.getReader();
    const stream = new ReadableStream({
        start(controller) {
            function push() {
                reader
                    .read()
                    .then(({ done, value }) => {

                        if (done) {
                            onComplete({});
                            controller.close();
                            return;
                        }
                        if (value) {
                            progress.flow(
                                value,
                                params.onProgress
                            );
                        }
                        controller.enqueue(value);
                        push();
                    })
                    .catch((err) => {
                        onError(err);
                    });
            }

            push();
        },
    });

    return new Response(stream, { headers, status });
}