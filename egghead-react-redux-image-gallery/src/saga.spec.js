import test from 'tape'
import { put, take, fork } from 'redux-saga/effects'
import { watchForLoadImages, loadImages } from './saga'
import { fetchImages } from './lorempixel'

test('watchForLoadImages', assert => {
    const generator = watchForLoadImages()

    assert.deepEqual(
        generator.next().value,
        take('LOAD_IMAGES'),
        'watchForLoadImages should be waiting for LOAD_IMAGES action'
    )

    assert.deepEqual(
        generator.next().value,
        fork(loadImages),
        'watchForLoadImages should call loadImages after LOAD_IMAGES action is received'
    )

    assert.end()
})