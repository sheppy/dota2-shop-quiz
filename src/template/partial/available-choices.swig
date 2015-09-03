<ul class="Choices">
    {% for item in choices %}
        <li>{% include "./item.swig" item %}</li>
    {% endfor %}
</ul>