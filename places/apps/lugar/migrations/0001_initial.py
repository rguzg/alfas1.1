# Generated by Django 2.2.4 on 2019-11-20 16:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='categoria',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=30)),
                ('descripcion', models.CharField(max_length=300)),
                ('urlMenu', models.URLField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='lugar',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=50)),
                ('descripcion', models.CharField(max_length=300)),
                ('direccion', models.CharField(max_length=300)),
                ('placeid', models.CharField(max_length=100)),
                ('horarioAbrir', models.TimeField(default='08:00:00')),
                ('horarioCerrar', models.TimeField(default='08:00:00')),
                ('abiertoLunes', models.BooleanField(null=True)),
                ('abiertoMartes', models.BooleanField(null=True)),
                ('abiertoMiercoles', models.BooleanField(null=True)),
                ('abiertoJueves', models.BooleanField(null=True)),
                ('abiertoViernes', models.BooleanField(null=True)),
                ('abiertoSabado', models.BooleanField(null=True)),
                ('abiertoDomingo', models.BooleanField(null=True)),
                ('telefono', models.CharField(max_length=10)),
                ('sitioweb', models.URLField(max_length=100)),
                ('urlFotos', models.URLField(max_length=100)),
                ('contadorFotos', models.IntegerField()),
                ('urlMenu', models.URLField(max_length=100)),
                ('eliminado', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='reporte',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo', models.CharField(max_length=50)),
                ('descripcion', models.CharField(max_length=300)),
                ('eliminado', models.BooleanField(default=False)),
                ('lugar', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lugar.lugar')),
            ],
        ),
        migrations.CreateModel(
            name='reporte_lugar',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lugar', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lugar.lugar')),
                ('reporte', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lugar.reporte')),
            ],
        ),
    ]
