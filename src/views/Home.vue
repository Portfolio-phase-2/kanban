<template>
  <div class="container">
    <div class="row">
      <!-- Button trigger modal -->
      <button type="button" class="btn btn-primary" style="right: 5%; bottom:50%; position:absolute" data-toggle="modal" data-target="#addModal"> + </button>
      <!-- Modal -->
      <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4>Add Planning</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <input type="text" v-model="title" placeholder="Title Planning" autofocus class="form-control mb-3">
              <input type="text" v-model="description" placeholder="Description" class="form-control">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" @click="addPlanning">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">

      <div class="col-md-3 mb-3">
        <h3 class="text-center bg-primary">Planning</h3>
        <draggable element="span" v-model="planning" :options="dragOptions">
          <transition-group name="no" class="list-group" tag="ul">
            <li class="list-group-item" v-for="(element, i) in planning" :key="element.title">
              <p> <strong>{{element.title}}</strong> </p>
              {{element.description}}
              <br>
              <button class="btn btn-danger btn-sm" @click="deletePlanning(i)"> <i class="fa fa-trash"></i> </button>
            </li>
          </transition-group>
        </draggable>
      </div>

      <div class="col-md-3 mb-3">
        <h3 class="text-center bg-secondary">Todo</h3>
        <draggable element="span" v-model="todo" :options="dragOptions">
          <transition-group name="no" class="list-group" tag="ul">
            <li class="list-group-item" v-for="(element, i) in todo" :key="element.title">
              <p> <strong>{{element.title}}</strong> </p>
              {{element.description}}
              <br>
              <button class="btn btn-danger btn-sm" @click="deleteTodo(i)"><i class="fa fa-trash"></i></button>
            </li>
          </transition-group>
        </draggable>
      </div>

      <div class="col-md-3 mb-3">
        <h3 class="text-center bg-warning">Doing</h3>
        <draggable element="span" v-model="doing" :options="dragOptions">
          <transition-group name="no" class="list-group" tag="ul">
            <li class="list-group-item" v-for="(element, i) in doing" :key="element.title">
              <p> <strong>{{element.title}}</strong> </p>
              {{element.description}}
              <br>
              <button class="btn btn-danger btn-sm" @click="deleteDoing(i)"><i class="fa fa-trash"></i></button>
            </li>
          </transition-group>
        </draggable>
      </div>

      <div class="col-md-3 mb-3">
        <h3 class="text-center bg-success">Done</h3>
        <draggable element="span" v-model="done" :options="dragOptions">
          <transition-group name="no" class="list-group" tag="ul">
            <li class="list-group-item" v-for="element in done" :key="element.title">
              <p> <strong>{{element.title}}</strong> </p>
              {{element.description}}
            </li>
          </transition-group>
        </draggable>
      </div>

    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import db from '@/config.js'
export default {
  title: 'task',
  components: {
    draggable
  },
  mounted () {
    this.getData()
  },
  methods: {
    addPlanning () {
      let obj = { title: this.title, description: this.description }
      this.planning.push(obj)
    },
    deletePlanning (i) {
      alert(JSON.stringify(this.planning[i].title))
      this.planning.splice(i, 1)
    },
    deleteTodo (i) {
      alert(JSON.stringify(this.todo[i].title))
      this.todo.splice(i, 1)
    },
    deleteDoing (i) {
      alert(JSON.stringify(this.doing[i].title))
      this.doing.splice(i, 1)
    },
    reWrite () {
      let obj = {
        planning: this.planning,
        todo: this.todo,
        doing: this.doing,
        done: this.done
      }
      db.ref().set(obj)
    },
    getData () {
      let ref = db.ref()
      ref.on('value', snapshot => {
        let planning = snapshot.val().planning
        let todo = snapshot.val().todo
        let doing = snapshot.val().doing
        let done = snapshot.val().done
        if (planning === undefined) {
          this.planning = []
        } else {
          this.planning = planning
        }

        if (todo === undefined) {
          this.todo = []
        } else {
          this.todo = todo
        }

        if (doing === undefined) {
          this.doing = []
        } else {
          this.doing = doing
        }

        if (done === undefined) {
          this.done = []
        } else {
          this.done = done
        }
      })
    }
  },
  data () {
    return {
      title: '',
      description: '',
      planning: [],
      todo: [],
      doing: [],
      done: [],
      editable: true,
      isDragging: false,
      delayedDragging: false
    }
  },
  computed: {
    dragOptions () {
      return {
        animation: 0,
        group: 'description',
        disabled: !this.editable,
        ghostClass: 'ghost'
      }
    }
  },
  watch: {
    planning: function () {
      this.reWrite()
    },
    todo: function () {
      this.reWrite()
    },
    doing: function () {
      this.reWrite()
    },
    done: function () {
      this.reWrite()
    }
  }
}
</script>

<style>
.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}
</style>
